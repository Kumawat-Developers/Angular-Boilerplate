import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from '@app/@core/services/global/global.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as appSettings from '../../../environments/environment';

class Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  baseUrl: any;
  productNames: string[] = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Brown Purse',
    'Chakra Bracelet',
    'Galaxy Earrings',
    'Game Controller',
    'Gaming Set',
    'Gold Phone Case',
    'Green Earbuds',
    'Green T-Shirt',
    'Grey T-Shirt',
    'Headphones',
    'Light Green T-Shirt',
    'Lime Band',
    'Mini Speakers',
    'Painted Phone Case',
    'Pink Band',
    'Pink Purse',
    'Purple Band',
    'Purple Gemstone Necklace',
    'Purple T-Shirt',
    'Shoes',
    'Sneakers',
    'Teal T-Shirt',
    'Yellow Earbuds',
    'Yoga Mat',
    'Yoga Set',
  ];

  constructor(
    private http: HttpClient,
    private globalDataService: GlobalService,

  ) {
    this.baseUrl = appSettings.environment.apiUrl;
  }

  getProductsSmall() {
    return this.http
      .get<any>('assets/json/products-small.json')
      .toPromise()
      .then((res) => <Product[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProducts() {
    return this.http
      .get<any>('assets/json/products.json')
      .toPromise()
      .then((res) => <Product[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProductsWithOrdersSmall() {
    return this.http
      .get<any>('assets/json/products-orders-small.json')
      .toPromise()
      .then((res) => <Product[]>res.data)
      .then((data) => {
        return data;
      });
  }
  generatePrduct(): Product {
    const product: Product = {
      id: this.generateId(),
      name: this.generateName(),
      description: 'Product Description',
      price: this.generatePrice(),
      quantity: this.generateQuantity(),
      category: 'Product Category',
      inventoryStatus: this.generateStatus(),
      rating: this.generateRating(),
    };

    product.image =
      product.name.toLocaleLowerCase().split(/[ ,]+/).join('-') + '.jpg';
    return product;
  }

  generateId() {
    let text = '';
    const possible ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }

  generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
  }

  generateRating() {
    return Math.floor(Math.random() * Math.floor(5) + 1);
  }
  getUserList(): Observable<any> {
    return this.http.get(this.baseUrl+"organization/?user=613e06986dfdcf25f8c61576&sortBy=asc&limit=1&page=1", this.requestOptions());
  }

  getProductList(id:any) : Observable<any>{
    return this.http.get(this.baseUrl+"product/?user="+id+"&sortBy=asc&limit=1&page=1", this.requestOptions());
  }
  getFragmentList(id:any) : Observable<any>{
    return this.http.get(this.baseUrl+"fragment/?product="+id+"&sortBy=asc&limit=1&page=1", this.requestOptions());
  }

  getSave(user: any): Observable<any> {
    /*     return this.http.post(this.baseUrl + 'users', user, this.requestOptions()).map((response: Response) => {
      return response;
    }); */
 /*    return this.http.get('http://jsonplaceholder.typicode.com/posts')
      .pipe(map((res) => res.json())); */
/*     return this.http.get('http://jsonplaceholder.typicode.com/posts')
      .pipe(map(res => res.json())); */
      return this.http
        .get<any>('http://jsonplaceholder.typicode.com/posts')
        .pipe(retry(1), catchError(this.handleError));

  }
   // Error handling
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
  updateUser(user: any): Observable<any> {
    /* return this.http
      .put(this.baseUrl + 'users', user, this.requestOptions())
      .map((response: Response) => {
        return response;
      }); */

      return this.http
      .get<any>('http://jsonplaceholder.typicode.com/posts')
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(
      this.baseUrl + 'users/' + id,
      this.requestOptions(),
    );
  }
  private requestOptions() {
   /*  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + JSON.parse(this.globalDataService.getToken()).access_token,
    }); */
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ',
    });
    const httpOptions = { headers: headers };
    return httpOptions;
  }
/*   private requestAuth() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('sudarshan' + ':' + 'password'),
    });
    const httpOptions = { headers: headers };
    return httpOptions;
  }
 */
  login(user: any): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);
    body.set('grant_type', 'password');
 /*    return this.http
      .post(this.baseUrl + 'oauth/token', body.toString(), this.requestAuth())
      .map((response: Response) => {
        return response;
      }); */
      return this.http.get<any>('http://jsonplaceholder.typicode.com/posts')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
}
