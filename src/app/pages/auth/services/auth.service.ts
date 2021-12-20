import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariables } from '@app/@core/helper/global.variables';
import { GeneralService } from '@app/@core/services/general/general.service';
import { GlobalService } from '@app/@core/services/global/global.service';
import { getItem, removeItem, setItem, StorageItem } from '@app/@core/utils';
import { environment } from '@environments/environment';
import { BehaviorSubject, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));
  baseUrl: any;
  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }
  constructor(
    private http: HttpClient,
    private globalDataService: GlobalService,
    private globalService: GlobalService,
    private generalService: GeneralService,
  ) {
    this.baseUrl = environment.apiUrl;
  }
  signIn(user: any, url: any): void {
    this.generalService.show();
    this.http
      .post(this.baseUrl + GlobalVariables.LOGIN_URL, user, {
        observe: 'response',
      })
      .subscribe(
        (res: any) => {
          if (res != (null || undefined) && res.status) {
            this.generalService.l(res.body);
            this.globalService.setAuthData(res.body);
            this.generalService.hide();
            console.log(url);

            this.generalService.navigate(url);
            setItem(StorageItem.Auth, res.body);
            this.isLoggedIn$.next(true);
          }
        },
        (error) => {
          this.generalService.restError(error);
        },
      );

    /*    const token = Array(4)
      .fill(0)
      .map(() => Math.random() * 99)
      .join('-');
    console.log(token);
    setItem(StorageItem.Auth, token);
    const token = Array(4)
      .fill(0)
      .map(() => Math.random() * 99)
      .join('-');

    setItem(StorageItem.Auth, token);
    this.isLoggedIn$.next(true); */
  }

  signOut(): void {
    removeItem(StorageItem.Auth);
    this.isLoggedIn$.next(false);
  }

  save(user: any) {
    return this.http.post(this.baseUrl + GlobalVariables.REGISTER_URL, user, {
      observe: 'response',
    });
  }
  saveForm(user) {
    return this.http.post(this.baseUrl + GlobalVariables.REGISTER_URL, user);
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
