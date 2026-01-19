//state para manejar los datos globales de la aplicacion
import { Injectable, signal, computed, effect } from '@angular/core';
import { Product, Business } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Signals para el negocio seleccionado
  private selectedBusinessSignal = signal<Business | null>(null);
  readonly selectedBusiness = this.selectedBusinessSignal.asReadonly();

  // Signals para el producto seleccionado
  private selectedProductSignal = signal<Product | null>(null);
  readonly selectedProduct = this.selectedProductSignal.asReadonly();

  // Computed signal para obtener el ID del negocio seleccionado
  readonly selectedBusinessId = computed(() => this.selectedBusiness()?.id ?? null);

  // Computed signal para obtener el ID del producto seleccionado
  readonly selectedProductId = computed(() => this.selectedProduct()?.id ?? null);

  //Signals para manejar la accion de editar costo o agregar producto
  private isEditingCostSignal = signal<boolean>(false);
  private isAddingProductSignal = signal<boolean>(false);

  readonly isEditingCost = this.isEditingCostSignal.asReadonly();
  readonly isAddingProduct = this.isAddingProductSignal.asReadonly();

  constructor() {
    effect(() => {
      console.log('Adding Product:', this.isAddingProduct);
      console.log('Editing Cost:', this.isEditingCost);

    });
  }

  // Método para establecer el negocio seleccionado
  setSelectedBusiness(business: Business | null): void {
    this.selectedBusinessSignal.set(business);
    // Limpiar producto seleccionado si cambia el negocio
    if (business && this.selectedProduct()?.businessId !== business.id) {
      this.selectedProductSignal.set(null);
    }
  }

  // Método para establecer el producto seleccionado
  setSelectedProduct(product: Product | null): void {
    this.selectedProductSignal.set(product);
  }

  // Método para limpiar todas las selecciones
  clearSelections(): void {
    this.selectedBusinessSignal.set(null);
    this.selectedProductSignal.set(null);
  }

  // Métodos para establecer el estado de edición/agregado
    setEditingCost(isEditing: boolean): void {
    this.isEditingCostSignal.set(isEditing);
    }
    setAddingProduct(isAdding: boolean): void {
    this.isAddingProductSignal.set(isAdding);
    }
}
