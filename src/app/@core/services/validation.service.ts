import { Injectable, Injector } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  translateInjector: any;
  constructor(private injector: Injector) {}

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    this.translateInjector = this.injector.get(TranslocoService);
    let config = {
      required: this.translateInjector.translate('required'),
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
    };
    return config[validatorName];
  }

  static requird(control: AbstractControl) {
    if (control.value != (null || undefined)) {
      let value = control.value;
      if (value != null || value != undefined || value != null) {
        if (value && value.length > 0) {
          return null;
        } else {
          return { required: true };
        }
      }
    }
  }
  static passwordValidator(field: AbstractControl) {
    const latinChars = /^[a-zA-Z]+$/;
    return field.value && latinChars.test(field.value)
      ? null
      : {
          other: 'Only latin letters are allowed',
        };
  }
}
