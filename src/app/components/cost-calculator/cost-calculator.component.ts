import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BusinessService } from '../../services/business.service';
import { PricingService } from '../../services/pricing.service';
import { Business, Product, CostType } from '../../models/business.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cost-calculator',
  templateUrl: './cost-calculator.component.html',
  styleUrls: ['./cost-calculator.component.scss']
})
export class CostCalculatorComponent implements OnInit, OnDestroy {
  calculatorForm: FormGroup;
  businesses: Business[] = [];
  products: Product[] = [];
  costTypes = Object.values(CostType);
  showProductForm = false;
  mode: 'new' | 'existing' = 'new';
  selectedProduct: Product | null = null;
  existingCosts: any[] = [];
  private subscriptions: Subscription[] = [];

  costTypeLabels: { [key: string]: string } = {
    [CostType.FIXED]: 'Costo Fijo',
    [CostType.VARIABLE]: 'Costo Variable',
    [CostType.LABOR]: 'Mano de Obra',
    [CostType.OVERHEAD]: 'Gastos Generales',
    [CostType.TAX]: 'Impuestos',
    [CostType.SHIPPING]: 'Envío/Logística'
  };

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private pricingService: PricingService
  ) {
    this.calculatorForm = this.fb.group({
      mode: ['new'],
      businessId: ['', Validators.required],
      existingProductId: [''],
      productName: ['', Validators.required],
      productDescription: [''],
      expectedMonthlyUnits: [100, [Validators.required, Validators.min(1)]],
      targetMargin: [30, [Validators.required, Validators.min(0)]],
      costs: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const businessSub = this.businessService.businesses$.subscribe(businesses => {
      this.businesses = businesses;
    });
    
    const productsSub = this.businessService.products$.subscribe(products => {
      this.products = products;
    });
    
    this.subscriptions.push(businessSub, productsSub);
    // this.addCost(); // Agregar un costo inicial
    
    // Escuchar cambios en el modo
    this.calculatorForm.get('mode')?.valueChanges.subscribe(mode => {
      this.onModeChange(mode);
    });
    
    // Escuchar cambios en businessId para filtrar productos
    this.calculatorForm.get('businessId')?.valueChanges.subscribe(() => {
      this.calculatorForm.patchValue({ existingProductId: '' });
      this.selectedProduct = null;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get costs(): FormArray {
    return this.calculatorForm.get('costs') as FormArray;
  }

  onModeChange(mode: string): void {
    this.mode = mode as 'new' | 'existing';
    
    if (mode === 'new') {
      this.calculatorForm.get('productName')?.setValidators([Validators.required]);
      this.calculatorForm.get('existingProductId')?.clearValidators();
      this.selectedProduct = null;
    } else {
      this.calculatorForm.get('productName')?.clearValidators();
      this.calculatorForm.get('existingProductId')?.setValidators([Validators.required]);
    }
    
    this.calculatorForm.get('productName')?.updateValueAndValidity();
    this.calculatorForm.get('existingProductId')?.updateValueAndValidity();
  }

  onProductSelect(event: any): void {
    const productId = event.target.value;
    if (productId) {
      this.selectedProduct = this.businessService.getProduct(productId) || null;
      if (this.selectedProduct) {
        this.loadExistingCosts(productId);
      }
    }
  }

  loadExistingCosts(productId: string): void {
    this.existingCosts = this.businessService.getCostsByProduct(productId);
  }

  getProductsByBusiness(): Product[] {
    const businessId = this.calculatorForm.get('businessId')?.value;
    if (!businessId) return [];
    return this.products.filter(p => p.businessId === businessId);
  }

  deleteExistingCost(costId: string): void {
    if (confirm('¿Estás seguro de eliminar este costo?')) {
      this.businessService.deleteCost(costId);
      if (this.selectedProduct) {
        this.loadExistingCosts(this.selectedProduct.id);
      }
    }
  }

  addCost(fromClick?:boolean): void {
    const costGroup = this.fb.group({
      name: ['', Validators.required],
      type: [CostType.VARIABLE, Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });
    
    this.costs.push(costGroup);
    const addButton = document.querySelector('.btn-add-cost');
    if(fromClick){
    // Scroll al nuevo costo agregado
    // setTimeout(() => {
    //   addButton?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }, 100);
    }

  }

  removeCost(index: number): void {
    if (this.costs.length > 1) {
      this.costs.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.calculatorForm.valid) {
      const formValue = this.calculatorForm.value;
      let product: Product;
      
      if (this.mode === 'new') {
        // Crear nuevo producto
        product = this.businessService.addProduct({
          businessId: formValue.businessId,
          name: formValue.productName,
          description: formValue.productDescription,
          targetMargin: formValue.targetMargin,
          expectedMonthlyUnits: formValue.expectedMonthlyUnits
        });
      } else {
        // Usar producto existente
        product = this.selectedProduct!;
        
        // Actualizar margen si cambió
        if (formValue.targetMargin !== product.targetMargin) {
          this.businessService.updateProduct(product.id, {
            targetMargin: formValue.targetMargin
          });
        }
      }

      // Agregar nuevos costos
      formValue.costs.forEach((cost: any) => {
        if (cost.name && cost.value > 0) {
          const costData = {
            productId: product.id,
            name: cost.name,
            type: cost.type,
            value: cost.value,
            isPercentage: false,
            description: cost.description
          };
          this.businessService.addCost(costData);
        }
      });

      const message = this.mode === 'new' 
        ? '✓ Producto y costos guardados exitosamente!'
        : '✓ Costos agregados exitosamente!';
      
      alert(message);
      this.resetForm();
      
      // Notificar que los datos se guardaron
      console.log('Producto guardado:', product);
      console.log('Total de costos:', this.businessService.getCostsByProduct(product.id).length);
    }
  }

  resetForm(): void {
    this.calculatorForm.reset({
      mode: 'new',
      expectedMonthlyUnits: 100,
      targetMargin: 30
    });
    this.costs.clear();
    this.addCost();
    this.selectedProduct = null;
    this.existingCosts = [];
    this.mode = 'new';
  }

  calculateTotal(): number {
    if (!this.costs.value) return 0;
    return this.costs.value.reduce((sum: number, cost: any) => sum + (cost.value || 0), 0);
  }

  calculateSuggestedPrice(): number {
    const total = this.calculateTotal();
    const margin = this.calculatorForm.get('targetMargin')?.value || 0;
    return this.pricingService.calculatePriceWithMargin(total, margin);
  }
}
