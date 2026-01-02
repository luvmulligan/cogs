import { Injectable } from '@angular/core';
import { BusinessService } from './business.service';
import { FirebaseBusinessService } from './firebase-business.service';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {
  constructor(
    private localService: BusinessService,
    private firebaseService: FirebaseBusinessService
  ) {}

  async migrateToFirebase(): Promise<void> {
    console.log('Iniciando migración a Firebase...');

    try {
      // Migrar negocios
      const businesses = this.localService.getBusinesses();
      for (const business of businesses) {
        const { id, ...businessData } = business;
        await this.firebaseService.addBusiness(businessData);
      }
      console.log(`✓ ${businesses.length} negocios migrados`);

      // Migrar productos
      const products = this.localService.getProducts();
      for (const product of products) {
        const { id, ...productData } = product;
        await this.firebaseService.addProduct(productData);
      }
      console.log(`✓ ${products.length} productos migrados`);

      // Migrar costos
      const costs = this.localService.getCosts();
      for (const cost of costs) {
        const { id, ...costData } = cost;
        await this.firebaseService.addCost(costData);
      }
      console.log(`✓ ${costs.length} costos migrados`);

      // Migrar costos fijos del negocio
      const fixedCosts = this.localService.getBusinessFixedCosts();
      for (const cost of fixedCosts) {
        const { id, ...costData } = cost;
        await this.firebaseService.addBusinessFixedCost(costData);
      }
      console.log(`✓ ${fixedCosts.length} costos fijos migrados`);

      console.log('✓ Migración completada exitosamente');
      
      // Opcional: Limpiar localStorage después de la migración
      // localStorage.clear();
    } catch (error) {
      console.error('Error durante la migración:', error);
      throw error;
    }
  }

  hasLocalData(): boolean {
    return localStorage.getItem('businesses') !== null ||
           localStorage.getItem('products') !== null ||
           localStorage.getItem('costs') !== null ||
           localStorage.getItem('businessFixedCosts') !== null;
  }
}
