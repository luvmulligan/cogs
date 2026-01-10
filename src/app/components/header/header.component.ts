import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LanguageService, Language, Translations } from '../../services/language.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterLink, MenubarModule]
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | null>;
  t: Translations;
  currentLanguage: Language;
   items: MenuItem[] | undefined;
   email!: string;

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
      this.updateMenuItems();
    });

    this.user$.subscribe(user => {
      this.email = user!.email || '';
      this.updateMenuItems();
    });
  }

  updateMenuItems(): void {
    this.items = [
      {
        label: 'Panel',
        icon: 'pi pi-objects-column',
        routerLink: '/dashboard'
      },
      {
        label: 'Calculadora',
        icon: 'pi pi-calculator',
        routerLink: '/calculator'
      },
      {
        label: 'Análisis',
        icon: 'pi pi-chart-line',
        routerLink: '/analysis'
      },
      {
        label: 'Guía',
        icon: 'pi pi-book',
        routerLink: '/education'
      },
      {
        label: '',
        icon: 'pi pi-user',
        items: [
          {
            label: this.email || 'Usuario',
            icon: 'pi pi-envelope',
            disabled: true
          },
          {
            separator: true
          },
          {
            label: this.currentLanguage === 'es' ? 'Cambiar a English' : 'Switch to Español',
            icon: 'pi pi-globe',
            command: () => this.toggleLanguage()
          },
          {
            separator: true
          },
          {
            label: this.currentLanguage === 'es' ? 'Cerrar Sesión' : 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
          }
        ]
      }
    ];
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
