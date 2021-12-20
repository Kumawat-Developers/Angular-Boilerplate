import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injectable,
  OnInit
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeList, ThemeService } from '@app/@core/services/theme';
import { getItem, StorageItem } from '@app/@core/utils';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { TranslocoService } from '@ngneat/transloco';
import { TuiDestroyService, TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { Observable, of, Subject } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  shareReplay,
  startWith,
  switchMap,
  takeUntil
} from 'rxjs/operators';

class Country {
  constructor(
    readonly name: string,
    readonly nativeName: string,
    readonly countryCode: string,
    readonly langCode: string,
    readonly lang: string,
    readonly avatarUrl: string | null = null,
    readonly disabled: boolean = false,
  ) {}

  toString(): string {
    return `${this.nativeName} (${this.name}) - ${this.lang}`;
  }
}

const databaseMockData: ReadonlyArray<Country> = [
  new Country(
    'India',
    'भारत',
    'IN',
    'en',
    'English',
    'https://www.countryflags.io/in/flat/64.png',
  ),
  new Country(
    'India',
    'भारत',
    'IN',
    'hi',
    'हिन्दी',
    'https://www.countryflags.io/in/flat/64.png',
  ),
  new Country(
    'Spain',
    'España',
    'ES',
    'es',
    'Spainish',
    'https://www.countryflags.io/es/flat/64.png',
  ),
];

@Injectable()
export class Service {
  private readonly request$ = new Subject<string>();

  // Imitating server request with switchMap + delay pair
  private readonly response$ = this.request$.pipe(
    distinctUntilChanged(),
    switchMap((query) =>
      of(
        databaseMockData.filter((Country) =>
          TUI_DEFAULT_MATCHER(Country, query),
        ),
      ).pipe(delay(Math.random() * 1000 + 500), startWith(null)),
    ),
    takeUntil(this.destroy$),
    shareReplay(1),
  );

  constructor(
    @Inject(TuiDestroyService) private readonly destroy$: Observable<void>,
  ) {}

  request(query: string | null): Observable<ReadonlyArray<Country> | null> {
    this.request$.next(query || '');

    return this.response$;
  }
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [Service, TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: boolean;
  open = false;
  isToggle = false;
  onClick(): void {
    this.open = !this.open;
  }

  onObscured(): void {
    if (true) {
      this.open = false;
    }
  }

  onActiveZone(): void {
    this.open = this.open;
  }
  // readonly items = [
  //   { name: 'John', surname: 'Cleese' },
  //   { name: 'Eric', surname: 'Idle' },
  //   { name: 'Graham', surname: 'Chapman' },
  //   { name: 'Michael', surname: 'Palin' },
  //   { name: 'Terry', surname: 'Gilliam' },
  //   { name: 'Terry', surname: 'Jones' },
  // ];

  // readonly stringify = (item: { name: string; surname: string }) =>
  //   `${item.name} ${item.surname}`;
  /*   readonly items = [
    {name: 'John', surname: 'Cleese'},
    {name: 'Eric', surname: 'Idle'},
    {name: 'Graham', surname: 'Chapman'},
    {name: 'Michael', surname: 'Palin'},
    {name: 'Terry', surname: 'Gilliam'},
    {name: 'Terry', surname: 'Jones'},
];

readonly stringify = (item: {name: string; surname: string}) =>
    `${item.name} ${item.surname}`; */
  readonly items = [
    'John Cleese',
    'Eric Idle',
    'Graham Chapman',
    'Michael Palin',
    'Terry Gilliam',
    'Terry Jones',
  ];

  value = '';
  testForm = new FormGroup({
    testValue1: new FormControl(true),
    countryList: new FormControl(),
  });
  path = ROUTER_UTILS.config.base;
  paths = ROUTER_UTILS.config;
  theme = ThemeList;

  search: any = '';
  isDark: any;
  readonly control = new FormControl();
  readonly itemss = [
    'John Cleese',
    'Eric Idle',
    'Graham Chapman',
    'Michael Palin',
    'Terry Gilliam',
    'Terry Jones',
  ];

  readonly form = new FormGroup({
    user: new FormControl(),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
    private serviceLoCo: TranslocoService,
    private themeService: ThemeService,
    @Inject(Service) readonly service: Service,
  ) {
    this.themeService.isDarks().subscribe({
      next: (user) => {
        this.isDark = user;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = !!getItem(StorageItem.Auth);
    const currentTheme = this.themeService.getTheme();
    console.log(currentTheme);
    this.testForm.controls['testValue1'].setValue(
      currentTheme == 'light' ? false : true,
    );
  }
  onClickSignOut(): void {
    this.open = !this.open;
    this.authService.signOut();

    const { root, signIn } = ROUTER_UTILS.config.auth;
    this.router.navigate(['/', root, signIn]);
  }
  language(event: any) {
    console.log(event);
    console.log(this.control.value);
    this.serviceLoCo.setActiveLang(this.control.value.langCode);
  }
  change() {
    console.log(this.testForm.controls['testValue1'].value);
    const val = this.testForm.controls['testValue1'].value;

    this.themeService.setTheme(
      val == false ? this.theme.Dark : this.theme.Light,
    );
    if (val==true) {
      console.log('true');
      this.themeService.switchTheme('saga-blue');
    } else {
      console.log('false');
      this.themeService.switchTheme('arya-blue');
    }

  }
  onClickDashboard(): void {
    //this.open = !this.open;
    this.open = false;
    const { dashboard } = ROUTER_UTILS.config.base;
    this.router.navigate(['/', dashboard]);
  }
  OnClickProfile(): void {
    //this.open = !this.open;
    this.open = false;
    const { root } = ROUTER_UTILS.config.user;
    this.router.navigate(['/', root]);
  }
  toggle(): void {
    console.log('toggle');

    this.isToggle = this.isToggle == true ? false : true;
    console.log(this.isToggle);
    if (this.isToggle) {
      const element = (document.getElementById('navBar').style.display =
        'none');
    } else {
      const element = (document.getElementById('navBar').style.display =
        'block');
    }
  }
}
