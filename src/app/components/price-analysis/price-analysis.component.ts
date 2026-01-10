import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseBusinessService } from '../../services/firebase-business.service';
import { PricingService } from '../../services/pricing.service';
import { LanguageService, Translations } from '../../services/language.service';
import { Product, PriceAnalysis, Cost, CostType, BusinessFixedCost, Business } from '../../models/business.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-price-analysis',
    templateUrl: './price-analysis.component.html',
    styleUrls: ['./price-analysis.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class PriceAnalysisComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  businesses: Business[] = [];
  selectedProduct: Product | null = null;
  analysis: PriceAnalysis | null = null;
  costs: Cost[] = [];
  businessFixedCosts: BusinessFixedCost[] = [];
  costsByType: { [key: string]: number } = {};
  scenarios: Array<any> = [];
  t: Translations;
  private subscriptions: Subscription[] = [];
  
  costTypeLabels: { [key: string]: string } = {
    [CostType.FIXED]: 'Costos Fijos del Negocio',
    [CostType.VARIABLE]: 'Costos Variables',
    [CostType.LABOR]: 'Mano de Obra',
    [CostType.OVERHEAD]: 'Gastos Generales',
    [CostType.TAX]: 'Impuestos',
    [CostType.SHIPPING]: 'Envío/Logística'
  };

  constructor(
    private businessService: FirebaseBusinessService,
    private pricingService: PricingService,
    private languageService: LanguageService
  ) {
    this.t = this.languageService.getTranslations();
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe(() => {
      this.t = this.languageService.getTranslations();
    });
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadData(): void {
    // Suscribirse a los cambios de negocios
    const businessesSub = this.businessService.businesses$.subscribe(businesses => {
      this.businesses = businesses;
    });

    // Suscribirse a los cambios de productos
    const productsSub = this.businessService.products$.subscribe(products => {
      this.products = products;
    });
    
    // Suscribirse a los cambios de costos
    const costsSub = this.businessService.costs$.subscribe(() => {
      if (this.selectedProduct) {
        this.selectProduct(this.selectedProduct);
      }
    });

    // Suscribirse a los cambios de costos fijos del negocio
    const fixedCostsSub = this.businessService.businessFixedCosts$.subscribe(() => {
      if (this.selectedProduct) {
        this.selectProduct(this.selectedProduct);
      }
    });
    
    this.subscriptions.push(businessesSub, productsSub, costsSub, fixedCostsSub);
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.costs = this.businessService.getCostsByProduct(product.id);
    
    // Obtener costos fijos del negocio
    this.businessFixedCosts = this.businessService.getBusinessFixedCostsByBusiness(product.businessId);
    
    // Obtener todos los productos del negocio para la distribución
    const businessProducts = this.products.filter(p => p.businessId === product.businessId);
    
    // Calcular análisis con costos fijos del negocio
    this.analysis = this.pricingService.calculatePriceAnalysis(
      product, 
      this.costs, 
      this.businessFixedCosts,
      businessProducts
    );
    
    this.costsByType = this.pricingService.getCostsByType(this.costs);
    this.scenarios = this.pricingService.simulatePriceScenarios(
      product, 
      this.costs,
      this.businessFixedCosts,
      businessProducts
    );
  }

  getCostTypeKeys(): string[] {
    return Object.keys(this.costsByType).filter(key => this.costsByType[key] > 0);
  }

  getCostPercentage(cost: number): number {
    if (!this.analysis || this.analysis.directCosts === 0) return 0;
    return (cost / this.analysis.directCosts) * 100;
  }

  getMarginColor(margin: number): string {
    if (margin < 20) return '#e74c3c';
    if (margin < 35) return '#f39c12';
    return '#27ae60';
  }

  getTotalBusinessFixedCosts(): number {
    return this.businessFixedCosts.reduce((sum, cost) => sum + cost.monthlyValue, 0);
  }
}
