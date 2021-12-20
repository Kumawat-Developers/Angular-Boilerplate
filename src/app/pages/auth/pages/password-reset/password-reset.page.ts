import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetPage {

  passwordResetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  onSubmit(){
    const passwordResetForm={

      email:this.passwordResetForm.controls['email'].value,
    }

    console.log(passwordResetForm);

  }

}
