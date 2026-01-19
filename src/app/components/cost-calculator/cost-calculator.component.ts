import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirebaseBusinessService } from '../../services/firebase-business.service';
import { PricingService } from '../../services/pricing.service';
import { LanguageService, Translations } from '../../services/language.service';
import { Business, Product, CostType } from '../../models/business.model';
import { Subscription } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectModule } from 'primeng/select';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import {DividerModule} from 'primeng/divider';
import {AccordionModule} from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StateService } from '../../services/state.service';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
    selector: 'app-cost-calculator',
    templateUrl: './cost-calculator.component.html',
    styleUrls: ['./cost-calculator.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule,ButtonModule, MessageModule, ProgressSpinnerModule, SelectButtonModule, DialogModule, FieldsetModule, SelectModule, PanelModule, AvatarModule, MenuModule, DrawerModule, InputTextModule, InputNumberModule, TooltipModule, DividerModule, AccordionModule, RadioButtonModule,TextareaModule, FloatLabelModule]
})
export class CostCalculatorComponent implements OnInit, OnDestroy {
  @Output() productSaved = new EventEmitter<Product>();
  
  calculatorForm: FormGroup;
  businesses: Business[] = [];
  products: Product[] = [];
  costTypes = Object.values(CostType);
  showProductForm = false;
  mode: 'new' | 'existing' = 'new';
  existingCosts: any[] = [];
  t: Translations;
  private subscriptions: Subscription[] = [];
  businessOptions: any[] = [];
  productOptions: any[] = [];
  costTypeOptionsCalc: any[] = [];
  selectedBusinessId: string = '';
  
  // Signal para rastrear cuándo los costos están disponibles
  private costsLoaded = signal(0);

  costTypeLabels: { [key: string]: string } = {
    [CostType.FIXED]: 'Costo Fijo',
    [CostType.VARIABLE]: 'Costo Variable',
    [CostType.LABOR]: 'Mano de Obra',
    [CostType.OVERHEAD]: 'Gastos Generales',
    [CostType.TAX]: 'Impuestos',
    [CostType.SHIPPING]: 'Envío/Logística'
  };

  initializeCostTypeOptions(): void {

    this.costTypeOptionsCalc = [
      { label: 'Costo Variable (materiales, insumos)', value: CostType.VARIABLE },
      { label: 'Mano de Obra Directa', value: CostType.LABOR },
      { label: 'Gasto General', value: CostType.OVERHEAD },
      { label: 'Impuesto', value: CostType.TAX },
      { label: 'Envío/Logística', value: CostType.SHIPPING }
    ];
  }

  updateBusinessOptions(): void {
    this.businessOptions = this.businesses.map(business => ({
      label: business.name,
      value: business.id
    }));
  }

  updateProductOptions(): void {
    const products = this.getProductsByBusiness();
    this.productOptions = products.map(product => ({
      label: product.name,
      value: product.id
    }));
  }

  constructor(
    private fb: FormBuilder,
    private businessService: FirebaseBusinessService,
    private pricingService: PricingService,
    private languageService: LanguageService,
    public stateService: StateService
  ) {
    this.t = this.languageService.getTranslations();
    this.calculatorForm = this.fb.group({
      mode: ['new'],
      businessId: [''],
      existingProductId: [''],
      productName: ['', Validators.required],
      productDescription: [''],
      expectedMonthlyUnits: [null, [Validators.required, Validators.min(1)]],
      targetMargin: [30, [Validators.required, Validators.min(0)]],
      costs: this.fb.array([])
    });

    // Effect para cargar costos cuando cambien el estado de edición O los costos disponibles
    effect(() => {
      const isEditing = this.stateService.isEditingCost();
      const selectedProduct = this.stateService.selectedProduct();
      const costsCount = this.costsLoaded();
      
      console.log('Effect triggered - isEditing:', isEditing, 'product:', selectedProduct?.id, 'costsCount signal:', costsCount);
      
      if (isEditing && selectedProduct && costsCount > 0) {
        this.existingCosts = this.businessService.getCostsByProduct(selectedProduct.id);
        console.log('Effect: Loading costs for product', selectedProduct.id, 'found:', this.existingCosts.length);
        
        if (this.existingCosts.length > 0) {
          this.loadProductForEditing(selectedProduct);
        }
      }
      if(this.stateService.isAddingProduct()) {
        this.resetForm();
      }

    });
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe(() => {
      this.t = this.languageService.getTranslations();
    });
    
    this.initializeCostTypeOptions();
    
    const businessSub = this.businessService.businesses$.subscribe(businesses => {
      this.businesses = businesses;
      this.updateBusinessOptions();
    });
    
    const productsSub = this.businessService.products$.subscribe(products => {
      this.products = products;
      this.updateProductOptions();
    });
    
    // Suscribirse a los cambios de costos y actualizar el signal
    const costsSub = this.businessService.costs$.subscribe((allCosts) => {
      console.log('Costs subscription fired. Total costs:', allCosts.length);
      // Actualizar el signal para disparar el effect
      this.costsLoaded.set(allCosts.length);
    });
    
    this.subscriptions.push(businessSub, productsSub, costsSub);
    
    // Si estamos agregando producto, agregar un costo inicial
    if (this.stateService.isAddingProduct()) {
      this.addCost(true);
    }
  }
  
  loadProductForEditing(product: Product): void {
    this.existingCosts = this.businessService.getCostsByProduct(product.id);
    console.log('Loading costs for product:', product.id, 'Found:', this.existingCosts.length);
    
    // Pre-llenar el formulario con datos del producto
    this.calculatorForm.patchValue({
      productName: product.name,
      productDescription: product.description,
      expectedMonthlyUnits: product.expectedMonthlyUnits,
      targetMargin: product.targetMargin
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get costs(): FormArray {
    return this.calculatorForm.get('costs') as FormArray;
  }

  // onModeChange(mode: string): void {
  //   this.mode = mode as 'new' | 'existing';
    
  //   if (mode === 'new') {
  //     this.calculatorForm.get('productName')?.setValidators([Validators.required]);
  //     this.calculatorForm.get('existingProductId')?.clearValidators();
  //     this.selectedProduct = null;
  //   } else {
  //     this.calculatorForm.get('productName')?.clearValidators();
  //     this.calculatorForm.get('existingProductId')?.setValidators([Validators.required]);
  //   }
    
  //   this.calculatorForm.get('productName')?.updateValueAndValidity();
  //   this.calculatorForm.get('existingProductId')?.updateValueAndValidity();
  // }

  // onProductSelect(event: any): void {
  //   const productId = event.target.value;
  //   if (productId) {
  //     this.selectedProduct = this.businessService.getProduct(productId) || null;
  //     if (this.selectedProduct) {
  //       this.loadExistingCosts(productId);
  //     }
  //   }
  // }

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
      if (this.stateService.selectedProduct()) {
        this.loadExistingCosts(this.stateService.selectedProduct()!.id);
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

  async onSubmit(): Promise<void> {
    if (this.calculatorForm.valid) {
      const formValue = this.calculatorForm.value;
      let product: Product;
      
      if (this.stateService.isAddingProduct()) {
        // Crear nuevo producto
        product = await this.businessService.addProduct({
          businessId: this.stateService.selectedBusiness()?.id || '',
          name: formValue.productName,
          description: formValue.productDescription,
          targetMargin: formValue.targetMargin,
          expectedMonthlyUnits: formValue.expectedMonthlyUnits
        });
      } else {
        // Usar producto existente
        product = this.stateService.selectedProduct()!;
        
        // Actualizar margen si cambió
        if (formValue.targetMargin !== product.targetMargin) {
          await this.businessService.updateProduct(product.id, {
            targetMargin: formValue.targetMargin
          });
        }
      }

      // Agregar nuevos costos
      for (const cost of formValue.costs) {
        if (cost.name && cost.value > 0) {
          const costData = {
            productId: product.id,
            name: cost.name,
            type: cost.type,
            value: cost.value,
            isPercentage: false,
            description: cost.description
          };
          await this.businessService.addCost(costData);
        }
      }

      const message = this.mode === 'new' 
        ? '✓ Producto y costos guardados exitosamente!'
        : '✓ Costos agregados exitosamente!';
      
      alert(message);
      this.resetForm();
      
      // Emitir evento para cerrar el drawer
      this.productSaved.emit(product);
      
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
    // this.selectedProduct = null;
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
