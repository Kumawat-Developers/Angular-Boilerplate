import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '@app/@core/services/general/general.service';
import { NotificationService } from '@app/@core/services/notification/notification.service';
import { RouterService } from '@app/@core/services/router/router.service';
import { getItem, StorageItem } from '@app/@core/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardService } from './dashboard.service';
class Users {
  userId?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: number;
  email?: number;
  role?: any;
}
class Organization {
  orgName?: string;
  isActive?: boolean;
  user?: string;
  isDeleted?: boolean;
  id?: string;
}
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

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  productDialog: boolean;
  products: Product[];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  users: Users[];
  organization: Organization[];
  selectedUsers: Users[];
  selectedOrganization: Organization[];
  public newOrg: Organization;
  user: Users;
  userSubmitted: boolean;
  userDialog: boolean;
  isLoggedIn$: any;
  constructor(
    private router: Router,
    private productService: DashboardService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _notificationService: NotificationService,
    private routerService: RouterService,
    private _location: Location,
    private generalService: GeneralService,
  ) {}

  ngOnInit(): void {
    console.log('kamlesh');
    this.generalService.show();
    this.isLoggedIn$ = !!getItem(StorageItem.Auth);
    console.log(this.isLoggedIn$);
    this.productService.getProducts().then((data) => (this.products = data));
    this.getUserList();
    //this.generalService.hide();
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  newUser() {
    this.newOrg = {};
    this.userSubmitted = false;
    this.userDialog = true;
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts.includes(val),
        );
        this.selectedProducts = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }
  editUser(organization: Organization) {
    //debugger
    this.newOrg = { ...organization };
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
  onClick(event: any): void {
    console.log(event);
    this.routerService.navigate('dashboard/product/' + event.user);
    //this.router.navigate(['dashboard/product/' + event.user]);
  }
  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }
  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
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
    //debugger
    console.log(this.user);
    if (this.newOrg.orgName == (null || undefined || '')) {
      const request = {
        orgName: this.newOrg.orgName,
      };
      this.productService.getSave(request).subscribe(
        (res) => {
          console.log(res);
          this.getUserList();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'User save',
            life: 3000,
          });
          this.userDialog = false;
          this.userSubmitted = false;
        },
        (error) => {
          // this.loading = false;
          //this._notificationService.error(error.message);
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
    } else {
      const request = {
        userId: this.user.userId,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
        role: [this.user.role],
      };
      this.productService.updateUser(request).subscribe(
        (res) => {
          console.log(res);
          this.getUserList();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Update User',
            life: 3000,
          });
          this.userDialog = false;
          this.userSubmitted = false;
        },
        (error) => {
          // this.loading = false;
          //this._notificationService.error(error.message);
          console.log(error);
          this.messageService.add({
            severity: 'danger',
            summary: 'Failed',
            detail: 'Failed to update user',
            life: 3000,
          });
          this.userDialog = false;
          this.userSubmitted = false;
        },
      );
    }
  }
  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  getUserList(): void {
    this.productService.getUserList().subscribe(
      (res) => {
        console.log(res);
        //debugger;
        this.organization = res.results;
        console.log(this.organization);
        this.generalService.hide();
      },
      (error) => {
        // this.loading = false;
        this._notificationService.error(error.message);
        console.log(error);
        this.generalService.restError(error);
      },
    );
  }
  back() {
    this._location.back();
  }
}
