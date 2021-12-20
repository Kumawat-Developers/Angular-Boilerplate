import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebShellModule } from '@shell/ft/web-shell.module';
import {
  TuiDialogModule, TuiModeModule, TuiNotificationsModule,
  TuiRootModule, TuiThemeNightModule, TUI_SANITIZER
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { TranslocoRootModule } from './transloco-root.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    WebShellModule,
    HttpClientModule,
    TranslocoRootModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiNotificationsModule,
    // NgxLoadingModule.forRoot({})
    NgxSpinnerModule,
    TuiThemeNightModule,
    TuiModeModule,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppModule {}
