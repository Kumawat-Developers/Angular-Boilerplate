import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { getItem, setItem, StorageItem } from '@app/@core/utils';
import { fromEventPattern, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_BASE_THEME, ThemeList } from './theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  destroy$ = new Subject();

  public isDark = new Subject<boolean>();
  private readonly mediaQuery = window.matchMedia(
    '(prefers-color-scheme: dark)',
  );

  constructor(@Inject(DOCUMENT) private document: Document) {}
  public isDarks(): Observable<boolean> {
    this.getDarkMode();
    return this.isDark.asObservable();
  }
  get systemTheme(): ThemeList.Light | ThemeList.Dark {
    return this.mediaQuery.matches ? ThemeList.Dark : ThemeList.Light;
  }

  get storedTheme(): ThemeList {
    return getItem(StorageItem.Theme) as ThemeList;
  }

  set storedTheme(theme: ThemeList) {
    setItem(StorageItem.Theme, theme);
  }

  init(): void {
    this.makeAutomaticCheck();
    this.listenForMediaQueryChanges();
    this.getDarkMode();
  }

  /**
   * Manually changes theme in LocalStorage & HTML body
   *
   * @param theme new theme
   */
  setTheme(theme: ThemeList): void {
    this.clearThemes();
    this.storedTheme = theme;

    let bodyClass = theme;

    if (theme === ThemeList.System) {
      bodyClass = this.systemTheme;
    }
    this.document.body.classList.add(bodyClass);
    this.getDarkMode();
  }
  public getTheme() {
    this.getDarkMode();
    return getItem(StorageItem.Theme) as ThemeList;
  }

  /**
   * Makes initial theme check based on LocalStorage theme
   *
   */
  private makeAutomaticCheck(): void {
    this.setTheme(this.storedTheme || DEFAULT_BASE_THEME);
  }

  /**
   * Handles system theme changes & applies theme automatically
   *
   */
  private listenForMediaQueryChanges(): void {
    fromEventPattern<MediaQueryListEvent>(
      this.mediaQuery.addListener.bind(this.mediaQuery),
      this.mediaQuery.removeListener.bind(this.mediaQuery),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // Only applies changes when the current theme is "system"
        if (this.storedTheme === ThemeList.System) {
          this.setTheme(ThemeList.System);
        }
      });
  }

  /**
   * Clears all themes in ThemeList enum from the HTML element
   *
   */
  private clearThemes(): void {
    for (const theme in ThemeList) {
      const key: ThemeList = ThemeList[theme as keyof typeof ThemeList];
      this.document.body.classList.remove(key);
    }
  }
  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
  getDarkMode() {
    let val = getItem(StorageItem.Theme);
    if (val == 'dark') {
      this.isDark.next(true);
    } else {
      this.isDark.next(false);
    }
  }
}
