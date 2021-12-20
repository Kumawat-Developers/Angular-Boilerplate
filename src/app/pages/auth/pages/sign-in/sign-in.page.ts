import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '../../services/auth.service';
@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {
  returnUrl: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${ROUTER_UTILS.config.base.home}`;
  }

  onClickSignIn(): void {
    //  this.authService.signIn();
    this.router.navigate([this.returnUrl]);
  }

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  onSubmit(): void {
    //this.authService.signIn();
    this.router.navigate([this.returnUrl]);
    const createUserForm = {
      email: this.signInForm.controls['email'].value,
      password: this.signInForm.controls['password'].value,
    };
    this.authService.signIn(createUserForm, this.returnUrl);
    console.log(createUserForm);
  }
}
