import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/@core/services/general/general.service';
import { NotificationService } from '@app/@core/services/notification/notification.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardService } from '../dashboard.service';
class Fragment {
  id?: string;
  message?: string;
  title?: string;
  data?: string;
  user?: string;
  organization?: string;
  product?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}
class Users {
  userId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: number;
  email?: number;
  role?: any;
}
@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss']
})
export class FragmentComponent implements OnInit {
  id: string;
  loading = false;
  productDialog: boolean;
  fragments: Fragment[];
  selectedFragments: Fragment[];
  submitted: boolean;
  users: Users[];
  selectedUsers: Users[];
  user: Users;
  userSubmitted: boolean;
  userDialog: boolean;
  isLoggedIn$: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: DashboardService,
    private _notificationService: NotificationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _location: Location,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.generalService.show();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getFragmentList(this.id);
  }

  getFragmentList(id): void {
    this.loading = true;
    this.productService.getFragmentList(id).subscribe(
      (res) => {
        console.log(res);
        debugger;

        this.fragments = res.results;
        console.log(this.fragments);
        this.loading = false;
        this.generalService.hide();
      },
      (error) => {
        this.loading = false;
        this._notificationService.error(error.message);
        console.log(error);
        this.generalService.restError(error);
      },
    );
  }
  back() {
    this._location.back();
  }

  openNew() {
    //this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  newUser() {
    this.user = {};
    this.userSubmitted = false;
    this.userDialog = true;
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected fragments?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fragments = this.fragments.filter(
          (val) => !this.selectedFragments.includes(val),
        );
        this.selectedFragments = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Fragments Deleted',
          life: 3000,
        });
      },
    });
  }
  editUser(user: Users) {
    debugger;
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: Users) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.username + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter((val) => val.userId !== user.userId);
        this.user = {};
        this.productService.deleteUser(user.userId).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Deleted user',
              life: 3000,
            });
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'danger',
              summary: 'Failed',
              detail: 'User save failed',
              life: 3000,
            });
            this.userDialog = false;
            this.userSubmitted = false;
          },
        );
      },
    });
  }
  editProduct(product: Fragment) {
   // this.product = { ...product };
    this.productDialog = true;
  }
  deleteProduct(product: Fragment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fragments = this.fragments.filter(val => val.id !== product.id);
      //  this.product = {};

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  hideUserDialog() {
    this.userDialog = false;
    this.userSubmitted = false;
  }
  saveUser() {
    debugger
    console.log(this.user);
    if (this.user.userId == null || this.user.userId == undefined ||  this.user.userId == '') {
      const request = {

        "firstName": this.user.firstName,
        "lastName": this.user.lastName,
        "username": this.user.username,
        "password": this.user.password,
        "email": this.user.email,
        "role": [
          this.user.role
        ]
      }
      this.productService.getSave(request).subscribe(
        (res) => {
          console.log(res);
        //  this.getUserList();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User save', life: 3000 });
          this.userDialog = false;
          this.userSubmitted = false;

        }, (error) => {
          // this.loading = false;
          //this._notificationService.error(error.message);
          console.log(error);
          this.messageService.add({ severity: 'danger', summary: 'Failed', detail: 'User save failed', life: 3000 });
          this.userDialog = false;
          this.userSubmitted = false;

        }
      );

    } else {
      const request = {
        "userId": this.user.userId,
        "firstName": this.user.firstName,
        "lastName": this.user.lastName,
        "username": this.user.username,
        "password": this.user.password,
        "email": this.user.email,
        "role": [
          this.user.role
        ]
      }
      this.productService.updateUser(request).subscribe(
        (res) => {
          console.log(res);
          //this.getUserList();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Update User', life: 3000 });
          this.userDialog = false;
          this.userSubmitted = false;

        }, (error) => {
          // this.loading = false;
          //this._notificationService.error(error.message);
          console.log(error);
          this.messageService.add({ severity: 'danger', summary: 'Failed', detail: 'Failed to update user', life: 3000 });
          this.userDialog = false;
          this.userSubmitted = false;

        }
      );

    }


  }
  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  saveProduct() {
    this.submitted = true;

 /*    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    } */
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.fragments.length; i++) {
      if (this.fragments[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  onClick(event:any) : void{
    console.log(event);
    const url='dashboard/product/'+this.id+'/fragment/'+event.user;
    this.router.navigate([url]);
  }

}
