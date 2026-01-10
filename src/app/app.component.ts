import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MigrationService } from './services/migration.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, HeaderComponent]
})
export class AppComponent implements OnInit {
  title = 'AppCogs - Gestión de Costos';
  showMigrationPrompt = false;
  migrating = false;

  constructor(private migrationService: MigrationService) {}

  ngOnInit(): void {
    // Verificar si hay datos en localStorage que necesitan migración
    this.showMigrationPrompt = this.migrationService.hasLocalData();
  }

  async migrateData(): Promise<void> {
    if (confirm('¿Deseas migrar tus datos locales a Firebase? Esta acción no se puede deshacer.')) {
      this.migrating = true;
      try {
        await this.migrationService.migrateToFirebase();
        alert('¡Datos migrados exitosamente a Firebase!');
        this.showMigrationPrompt = false;
      } catch (error) {
        alert('Error al migrar datos. Por favor, revisa la consola.');
        console.error(error);
      } finally {
        this.migrating = false;
      }
    }
  }

  dismissMigration(): void {
    if (confirm('¿Estás seguro? Tus datos locales no se sincronizarán con Firebase.')) {
      this.showMigrationPrompt = false;
    }
  }
}
