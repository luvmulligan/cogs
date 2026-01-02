import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  isRegisterMode: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      if (this.isRegisterMode) {
        await this.authService.register(this.email, this.password);
      } else {
        await this.authService.login(this.email, this.password);
      }
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Error al autenticar';
    } finally {
      this.loading = false;
    }
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
  }
}
