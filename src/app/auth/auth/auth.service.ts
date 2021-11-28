import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  register?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User | null>;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.user$ = new BehaviorSubject<User | null>(null);
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCY2ljGbfAh1nRJLu7O_flI-yRWXi8Ma4Q', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).
    pipe (
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuth(
          responseData.email, 
          responseData.localId, 
          responseData.idToken, 
          +responseData.expiresIn);
      })
    );
  }

  private handleAuth(email:string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user$.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  signUp(email: string, password: string) {

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCY2ljGbfAh1nRJLu7O_flI-yRWXi8Ma4Q', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
        catchError(this.handleError), tap(responseData => {
          const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
          const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
          this.user$.next(user);
         }));
  }

  logOut() {
    this.user$.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut()
    },
      expirationDuration)
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate:string;
    }
    = JSON.parse(<string>localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const currentUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (currentUser.token) {
      this.user$.next(currentUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
          if (!error.error || !error.error.error) {
            return throwError(errorMessage)
          }
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists in our database'
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exist';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This password is not correct';
              break;
          }
          return throwError(errorMessage)
  }
}
