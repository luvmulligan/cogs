import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(this.auth, provider);
    } catch (error: any) {
      console.error('Error al iniciar sesión con Google:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/popup-closed-by-user':
        return 'Inicio de sesión cancelado';
      case 'auth/popup-blocked':
        return 'La ventana emergente fue bloqueada. Por favor, permite las ventanas emergentes para este sitio';
      case 'auth/cancelled-popup-request':
        return 'Inicio de sesión cancelado';
      case 'auth/account-exists-with-different-credential':
        return 'Ya existe una cuenta con este email usando un método diferente';
      case 'auth/configuration-not-found':
        return 'Google Sign-In no está configurado correctamente. Por favor, habilita el proveedor de Google en Firebase Console → Authentication → Sign-in method';
      case 'auth/invalid-email':
        return 'El email no es válido';
      case 'auth/user-disabled':
        return 'El usuario ha sido deshabilitado';
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/email-already-in-use':
        return 'El email ya está registrado';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'auth/invalid-credential':
        return 'Credenciales inválidas';
      default:
        return `Error de autenticación: ${errorCode}`;
    }
  }
}
