import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '@app/@core/services/validation.service';

@Component({
  selector: 'app-validation-message',
  styleUrls: ['./validation-message.component.scss'],
  template: `<div class ="alert-validate" *ngIf="errorMessage !== null">{{ errorMessage }}</div>`,
})
export class ValidationMessageComponent {
  @Input() control: FormControl;
  constructor(private validationService: ValidationService) {}

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return this.validationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName],
        );
      }
    }

    return null;
  }
}
