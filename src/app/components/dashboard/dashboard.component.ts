import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FirebaseBusinessService } from '../../services/firebase-business.service';
import { PricingService } from '../../services/pricing.service';
import { Business, Product, BusinessFixedCost, CostType, Asset, AssetType } from '../../models/business.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  businesses: Business[] = [];
  products: Product[] = [];
  businessFixedCosts: BusinessFixedCost[] = [];
  assets: Asset[] = [];
  selectedBusiness: Business | null = null;
  stats = {
    totalProducts: 0,
    avgMargin: 0,
    totalRevenue: 0,
    profitableProducts: 0
  };
  showBusinessForm = false;
  showFixedCostsForm = false;
  showAssetsForm = false;
  newFixedCost = {
    name: '',
    type: CostType.FIXED as CostType,
    monthlyValue: 0
  };
  newAsset = {
    name: '',
    type: AssetType.EQUIPMENT as AssetType,
    purchaseValue: 0,
    usefulLifeMonths: 12,
    description: ''
  };
  assetTypes = Object.values(AssetType);
  assetTypeLabels: { [key: string]: string } = {
    [AssetType.MACHINERY]: 'Maquinaria',
    [AssetType.EQUIPMENT]: 'Equipamiento',
    [AssetType.TOOLS]: 'Herramientas',
    [AssetType.FURNITURE]: 'Mobiliario',
    [AssetType.VEHICLE]: 'Vehículos',
    [AssetType.TECHNOLOGY]: 'Tecnología',
    [AssetType.OTHER]: 'Otros'
  };
  private subscriptions: Subscription[] = [];
  @ViewChild('expenseChart', { static: false }) expenseChartRef?: ElementRef<HTMLCanvasElement>;

  constructor(
    private businessService: FirebaseBusinessService,
    private pricingService: PricingService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.drawExpenseChart(), 100);
  }

  loadData(): void {
    // Suscribirse a los cambios de negocios
    const businessSub = this.businessService.businesses$.subscribe(businesses => {
      this.businesses = businesses;
      if (this.businesses.length > 0 && !this.selectedBusiness) {
        this.selectedBusiness = this.businesses[0];
      }
      this.loadBusinessFixedCosts();
      this.calculateStats();
      this.refreshChart();
    });

    // Suscribirse a los cambios de productos
    const productsSub = this.businessService.products$.subscribe(products => {
      this.products = products;
      this.calculateStats();
      this.refreshChart();
    });

    // Suscribirse a los cambios de costos fijos del negocio
    const fixedCostsSub = this.businessService.businessFixedCosts$.subscribe(() => {
      this.loadBusinessFixedCosts();
      this.calculateStats();
      this.refreshChart();
    });

    // Suscribirse a los cambios de activos
    const assetsSub = this.businessService.assets$.subscribe(() => {
      this.loadAssets();
      this.calculateStats();
      this.refreshChart();
    });

    this.subscriptions.push(businessSub, productsSub, fixedCostsSub, assetsSub);
  }

  loadBusinessFixedCosts(): void {
    if (this.selectedBusiness) {
      this.businessFixedCosts = this.businessService.getBusinessFixedCostsByBusiness(this.selectedBusiness.id);
    }
  }

  calculateStats(): void {
    if (!this.selectedBusiness) {
      return;
    }

    const businessProducts = this.products.filter(p => p.businessId === this.selectedBusiness!.id);
    this.stats.totalProducts = businessProducts.length;

    if (businessProducts.length === 0) {
      this.stats.avgMargin = 0;
      this.stats.profitableProducts = 0;
      return;
    }

    let totalMargin = 0;
    let profitableCount = 0;

    businessProducts.forEach(product => {
      const costs = this.businessService.getCostsByProduct(product.id);
      const analysis = this.pricingService.calculatePriceAnalysis(
        product, 
        costs, 
        this.businessFixedCosts,
        businessProducts
      );
      
      totalMargin += analysis.profitMarginPercent;
      if (analysis.profitMargin > 0) {
        profitableCount++;
      }
    });

    this.stats.avgMargin = totalMargin / businessProducts.length;
    this.stats.profitableProducts = profitableCount;
  }

  selectBusiness(business: Business): void {
    this.selectedBusiness = business;
    this.loadBusinessFixedCosts();
    this.loadAssets();
    this.calculateStats();
    this.refreshChart();
  }

  toggleBusinessForm(): void {
    this.showBusinessForm = !this.showBusinessForm;
  }

  onBusinessCreated(): void {
    this.showBusinessForm = false;
    this.loadData();
  }

  // Gestión de activos
  loadAssets(): void {
    if (this.selectedBusiness) {
      this.assets = this.businessService.getAssetsByBusiness(this.selectedBusiness.id);
    }
  }

  toggleAssetsForm(): void {
    this.showAssetsForm = !this.showAssetsForm;
  }

  async addAsset(): Promise<void> {
    if (!this.selectedBusiness || !this.isAssetValid()) {
      return;
    }

    await this.businessService.addAsset({
      businessId: this.selectedBusiness.id,
      name: this.newAsset.name,
      type: this.newAsset.type,
      purchaseValue: this.newAsset.purchaseValue,
      usefulLifeMonths: this.newAsset.usefulLifeMonths,
      purchaseDate: new Date(),
      description: this.newAsset.description
    });

    // Resetear formulario
    this.newAsset = {
      name: '',
      type: AssetType.EQUIPMENT,
      purchaseValue: 0,
      usefulLifeMonths: 12,
      description: ''
    };
    this.showAssetsForm = false;
  }

  async deleteAsset(id: string): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este activo?')) {
      await this.businessService.deleteAsset(id);
    }
  }

  isAssetValid(): boolean {
    return this.newAsset.name.trim() !== '' && 
           this.newAsset.purchaseValue > 0 &&
           this.newAsset.usefulLifeMonths > 0;
  }

  getAssetDepreciation(asset: Asset): number {
    return this.businessService.calculateMonthlyDepreciation(asset);
  }

  getTotalDepreciation(): number {
    if (!this.selectedBusiness) return 0;
    return this.businessService.getTotalMonthlyDepreciation(this.selectedBusiness.id);
  }

  getAssetTypeLabel(type: AssetType): string {
    return this.assetTypeLabels[type] || type;
  }

  // Gestión de costos fijos del negocio
  addFixedCost(): void {
    if (!this.selectedBusiness || !this.isFixedCostValid()) {
      return;
    }

    this.businessService.addBusinessFixedCost({
      businessId: this.selectedBusiness.id,
      name: this.newFixedCost.name,
      type: this.newFixedCost.type,
      monthlyValue: this.newFixedCost.monthlyValue
    });

    // Resetear formulario
    this.newFixedCost = {
      name: '',
      type: CostType.FIXED,
      monthlyValue: 0
    };
  }

  deleteFixedCost(id: string): void {
    if (confirm('¿Estás seguro de eliminar este costo fijo?')) {
      this.businessService.deleteBusinessFixedCost(id);
    }
  }

  isFixedCostValid(): boolean {
    return this.newFixedCost.name.trim() !== '' && 
           this.newFixedCost.monthlyValue > 0;
  }

  getTotalFixedCosts(): number {
    return this.businessFixedCosts.reduce((sum, cost) => sum + cost.monthlyValue, 0);
  }

  getCostTypeLabel(type: CostType): string {
    const labels: { [key in CostType]: string } = {
      [CostType.FIXED]: 'Costo Fijo',
      [CostType.VARIABLE]: 'Variable',
      [CostType.LABOR]: 'Mano de Obra',
      [CostType.OVERHEAD]: 'Gasto General',
      [CostType.TAX]: 'Impuesto',
      [CostType.SHIPPING]: 'Envío'
    };
    return labels[type] || type;
  }

  getProductsForBusiness(): Product[] {
    if (!this.selectedBusiness) {
      return [];
    }
    return this.products.filter(p => p.businessId === this.selectedBusiness!.id);
  }

  editProductUnits(product: Product): void {
    const units = prompt(
      `¿Cuántas unidades de "${product.name}" esperas vender al mes?\n\n` +
      `Esto ayuda a distribuir los costos fijos proporcionalmente.`,
      product.expectedMonthlyUnits?.toString() || '100'
    );

    if (units !== null) {
      const unitsNumber = parseInt(units, 10);
      if (unitsNumber > 0) {
        this.businessService.updateProduct(product.id, {
          expectedMonthlyUnits: unitsNumber
        });
      } else {
        alert('El número de unidades debe ser mayor a 0');
      }
    }
  }

  getExpensesByCategory(): { category: string; amount: number; color: string }[] {
    if (!this.selectedBusiness) {
      return [];
    }

    const categoryMap = new Map<string, number>();
    const businessProducts = this.products.filter(p => p.businessId === this.selectedBusiness!.id);

    // Agregar costos fijos del negocio
    this.businessFixedCosts.forEach(cost => {
      const label = this.getCostTypeLabel(cost.type);
      categoryMap.set(label, (categoryMap.get(label) || 0) + cost.monthlyValue);
    });

    // Agregar costos de productos
    businessProducts.forEach(product => {
      const costs = this.businessService.getCostsByProduct(product.id);
      costs.forEach(cost => {
        const label = this.getCostTypeLabel(cost.type);
        const monthlyCost = cost.value * (product.expectedMonthlyUnits || 0);
        categoryMap.set(label, (categoryMap.get(label) || 0) + monthlyCost);
      });
    });

    // Colores para cada categoría
    const colors: { [key: string]: string } = {
      'Costo Fijo': '#3498db',
      'Variable': '#2ecc71',
      'Mano de Obra': '#e74c3c',
      'Gasto General': '#f39c12',
      'Impuesto': '#9b59b6',
      'Envío': '#1abc9c',
      'Salario Administrativo': '#e67e22'
    };

    return Array.from(categoryMap.entries())
      .filter(([_, amount]) => amount > 0)
      .map(([category, amount]) => ({
        category,
        amount,
        color: colors[category] || '#95a5a6'
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  getTotalExpenses(): number {
    const expenses = this.getExpensesByCategory();
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getExpensePercentage(amount: number): number {
    const total = this.getTotalExpenses();
    return total > 0 ? (amount / total) * 100 : 0;
  }

  drawExpenseChart(): void {
    if (!this.expenseChartRef || !this.selectedBusiness) {
      return;
    }

    const canvas = this.expenseChartRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const expenses = this.getExpensesByCategory();
    if (expenses.length === 0) {
      // Mostrar mensaje si no hay datos
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#7f8c8d';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('No hay gastos registrados', canvas.width / 2, canvas.height / 2);
      return;
    }

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentAngle = -Math.PI / 2; // Comenzar desde arriba

    expenses.forEach(expense => {
      const sliceAngle = (expense.amount / total) * 2 * Math.PI;

      // Dibujar segmento
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = expense.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Agregar etiqueta de porcentaje si es mayor al 5%
      const percentage = (expense.amount / total) * 100;
      if (percentage > 5) {
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${percentage.toFixed(0)}%`, labelX, labelY);
      }

      currentAngle += sliceAngle;
    });
  }

  refreshChart(): void {
    setTimeout(() => this.drawExpenseChart(), 100);
  }
}
