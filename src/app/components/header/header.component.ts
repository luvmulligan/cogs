import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LanguageService, Language, Translations } from '../../services/language.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | null>;
  t: Translations;
  currentLanguage: Language;

  constructor(
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService
  ) {
    this.user$ = this.authService.user$;
    this.t = this.languageService.getTranslations();
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe(() => {
      this.t = this.languageService.getTranslations();
      this.currentLanguage = this.languageService.getCurrentLanguage();
    });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLanguage === 'es' ? 'en' : 'es';
    this.languageService.setLanguage(newLang);
  }
}
