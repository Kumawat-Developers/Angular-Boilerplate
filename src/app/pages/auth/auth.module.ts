import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '@app/@core/services/general/general.service';
import { NotificationService } from '@app/@core/services/notification/notification.service';
import { ValidationMesssagesModule } from '@app/@shell/ui/validation-messsages/validation-messsages.module';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { TuiButtonModule, TuiErrorModule, TuiLinkModule } from '@taiga-ui/core';
import {
  TuiFieldErrorModule,
  TuiInputModule,
  TuiInputPasswordModule
} from '@taiga-ui/kit';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { PasswordResetFailedPage } from './pages/password-reset-failed/password-reset-failed.page';
import { PasswordResetSucceededPage } from './pages/password-reset-succeeded/password-reset-succeeded.page';
import { PasswordResetPage } from './pages/password-reset/password-reset.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
@NgModule({
  declarations: [
    SignInPage,
    SignUpPage,
    ForgotPasswordPage,
    PasswordResetPage,
    PasswordResetSucceededPage,
    PasswordResetFailedPage,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiInputPasswordModule,
    TuiLinkModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    HttpClientModule,
    ToastModule,
    TranslocoRootModule,
    ValidationMesssagesModule
  ],
  providers: [MessageService, ConfirmationService, NotificationService,GeneralService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
