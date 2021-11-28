import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {Form, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signUpForm: FormGroup;

  matcher = new ErrorStateMatcher();
  loginMode = true;
  isLoading = false;
  errorAccured: string = "";
  successSignUpMessage: string = "";

  loginSwitch() {
    this.loginMode = !this.loginMode;
  }

  constructor(private authService: AuthService, private router: Router) { 
    this.signUpForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {

  }

  onSubmitForm() {
    if (!this.signUpForm.valid) {
      return;
    }

    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    this.isLoading = true;
    if (this.loginMode) {
      this.authService.login(email,password).subscribe(responseData => {
        this.isLoading = false;
        this.errorAccured = ''
        this.router.navigate(['/flights']);
      }, 
      (error) => {
          this.isLoading = false;
          this.errorAccured = error;
      });
    } else { 
      this.authService.signUp(email,password).subscribe(responseData => {
        this.isLoading = false;
        this.successSignUpMessage = "You have been successfuly sing up.";
        this.errorAccured = ''
      }, 
      (error) => {
          this.isLoading = false;
          this.errorAccured = error;
          this.successSignUpMessage = '';
      });
    }
 
    this.signUpForm.reset();
  }

}
