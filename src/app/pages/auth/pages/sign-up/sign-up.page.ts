import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder, Validators
} from '@angular/forms';
import { GeneralService } from '@app/@core/services/general/general.service';
import { GlobalService } from '@app/@core/services/global/global.service';
import { ValidationService } from '@app/@core/services/validation.service';
import { AuthService } from '../../services/auth.service';
@Component({
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  providers: [GeneralService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPage {
  signUpForm: any;
  constructor(
    private authService: AuthService,
    private globalService: GlobalService,
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
  ) {
    this.signUpForm = this.formBuilder.group({
      userName: ['', ValidationService.requird, Validators.minLength(5)],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      cpassword: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  /*   signUpForm = new FormGroup({
    userName: new FormControl('', [
      ValidationService.requird,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    cpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  }); */
  onSubmit(): void {
    this.generalService.show();
    const createUserForm = {
      name: this.signUpForm.controls['userName'].value,
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value,
    };

    console.log(createUserForm);
    this.authService.save(createUserForm).subscribe(
      (res: any) => {
        if (res != (null || undefined) && res.status) {
          this.generalService.l(res);
          this.globalService.setAuthData(res);
          this.generalService.hide();
        }
      },
      (error) => {
        this.generalService.restError(error);
      },
    );
  }
}
