import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GeneralService } from '@app/@core/services/general/general.service';
import { NotificationService } from '@app/@core/services/notification/notification.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { ValidationMesssagesModule } from '../validation-messsages/validation-messsages.module';
import { LayoutComponent } from './layout.component';
@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    ValidationMesssagesModule,
    ToastModule,
    NgxSpinnerModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    NotificationService,
    GeneralService,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
