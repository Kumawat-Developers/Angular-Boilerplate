import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariables } from '@app/@core/helper/global.variables';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  ipAddress: any;
  public currentUser = new Subject<any>();
  constructor(public http: HttpClient, private router: Router) {}
  getUserCurrentLocation(ip: any): Observable<any> {
    // return null;
    /*    return this.http.get("https://thread-frost-buffet.glitch.me/cool?ip=" + ip).map((response: Response) => {
      return response;
    }); */
    return this.http
      .get<any>('https://thread-frost-buffet.glitch.me/cool?ip=' + ip)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getIPAddress(): Observable<any> {
    // return this.http.get("https://api64.ipify.org/?format=json").map((response: Response) => {
    //   return response;
    // });
    return this.http
      .get<any>('https://api64.ipify.org/?format=json')
      .pipe(retry(1), catchError(this.handleError));
    // return this.http.get("https://api64.ipify.org/?format=json").pipe(map((response: any) => response.json()));
  }
  getCurrentUser() {
    this.currentUser;
  }
  setCurrentUser(user: any) {
    this.currentUser.next(user);
  }
  setUser(user: string): void {
    localStorage.setItem(GlobalVariables.COOKIE_USERS, user);
    this.homePage();
  }
  removeUser() {
    localStorage.removeItem(GlobalVariables.COOKIE_USERS);
    this.router.navigate([GlobalVariables.USERLOGOUT_URL]);
  }
  homePage() {
    debugger;
    this.router.navigate([GlobalVariables.HOMEPAGE_URL]);
  }
  saveUserToken(user: any): void {
    localStorage.setItem(GlobalVariables.COOKIE_TOKEN, user);
    this.homePage();
  }
  getToken() {
    return localStorage.getItem(GlobalVariables.COOKIE_TOKEN);
  }
  setAuthData(auth: any) {
    localStorage.setItem(GlobalVariables.AUTH_LS, auth);
  }
}
