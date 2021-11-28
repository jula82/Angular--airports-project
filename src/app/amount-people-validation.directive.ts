import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CustomValidationService } from './custom-validation.service';

@Directive({
  selector: '[appAmountPeopleValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: AmountPeopleValidationDirective, multi: true}]
})
export class AmountPeopleValidationDirective implements Validator {

  constructor(private validationService: CustomValidationService) {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validationService.amountPeopleValidator()(control);
  }
}
