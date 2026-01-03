import { Injectable } from '@angular/core';
import { Cost, CostType, PriceAnalysis, Product, BusinessFixedCost, Asset } from '../models/business.model';
import { FirebaseBusinessService } from './firebase-business.service';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private businessService: FirebaseBusinessService) {}

  /**
   * Calcula el análisis de precios para un producto
   * Incluye la distribución de costos fijos del negocio
   */
  calculatePriceAnalysis(
    product: Product, 
    productCosts: Cost[], 
    businessFixedCosts: BusinessFixedCost[],
    allProducts: Product[]
  ): PriceAnalysis {
    // Costos directos del producto
    const directCosts = this.calculateDirectCosts(productCosts);
    const variableCosts = this.calculateVariableCosts(productCosts);

    // Costos fijos del negocio asignados a este producto
    const allocatedFixedCosts = this.allocateFixedCostsToProduct(
      product, 
      businessFixedCosts, 
      allProducts
    );

    const totalCosts = directCosts + allocatedFixedCosts;

    // Precio mínimo = costos totales (punto de equilibrio)
    const minimumPrice = totalCosts;

    // Precio objetivo = costos + margen de ganancia objetivo
    const targetMargin = product.targetMargin / 100;
    const targetPrice = totalCosts * (1 + targetMargin);

    // Precio sugerido (con un pequeño buffer adicional)
    const suggestedPrice = totalCosts * (1 + targetMargin + 0.05);

    // Margen de ganancia con el precio objetivo
    const profitMargin = targetPrice - totalCosts;
    const profitMarginPercent = ((targetPrice - totalCosts) / targetPrice) * 100;

    // Unidades necesarias para alcanzar el punto de equilibrio del producto
    const breakEvenUnits = allocatedFixedCosts > 0 && variableCosts > 0
      ? Math.ceil(allocatedFixedCosts / (targetPrice - variableCosts))
      : 0;

    const fixedCostsPercent = totalCosts > 0 ? (allocatedFixedCosts / totalCosts) * 100 : 0;

    return {
      productId: product.id,
      totalCosts,
      directCosts,
      allocatedFixedCosts,
      variableCosts,
      minimumPrice,
      targetPrice,
      suggestedPrice,
      profitMargin,
      profitMarginPercent,
      breakEvenUnits,
      fixedCostsPercent
    };
  }

  /**
   * Distribuye los costos fijos del negocio entre productos
   * Usa la proporción de unidades esperadas de cada producto
   * Incluye la amortización de activos
   */
  private allocateFixedCostsToProduct(
    product: Product,
    businessFixedCosts: BusinessFixedCost[],
    allProducts: Product[]
  ): number {
    // Costos fijos mensuales (alquiler, servicios, etc.)
    const totalFixedCosts = businessFixedCosts.reduce((sum, cost) => sum + cost.monthlyValue, 0);
    
    // Amortización mensual de activos del negocio
    const totalDepreciation = this.businessService.getTotalMonthlyDepreciation(product.businessId);
    
    // Total de costos fijos incluyendo amortizaciones
    const totalFixedCostsWithDepreciation = totalFixedCosts + totalDepreciation;
    
    if (totalFixedCostsWithDepreciation === 0) return 0;

    // Si el producto tiene unidades esperadas, calcular su proporción
    if (product.expectedMonthlyUnits && product.expectedMonthlyUnits > 0) {
      const totalExpectedUnits = allProducts
        .filter(p => p.businessId === product.businessId)
        .reduce((sum, p) => sum + (p.expectedMonthlyUnits || 0), 0);

      if (totalExpectedUnits > 0) {
        // Distribuir proporcionalmente según unidades esperadas
        const proportion = product.expectedMonthlyUnits / totalExpectedUnits;
        const allocatedMonthlyFixed = totalFixedCostsWithDepreciation * proportion;
        // Retornar el costo fijo por unidad
        return allocatedMonthlyFixed / product.expectedMonthlyUnits;
      }
    }

    // Si no hay unidades esperadas, distribuir equitativamente
    const productCount = allProducts.filter(p => p.businessId === product.businessId).length;
    if (productCount > 0) {
      return totalFixedCostsWithDepreciation / productCount;
    }

    return 0;
  }

  /**
   * Calcula los costos directos del producto (variables + labor + shipping, etc.)
   */
  calculateDirectCosts(costs: Cost[]): number {
    return costs
      .filter(c => !c.isPercentage)
      .reduce((sum, cost) => sum + cost.value, 0);
  }

  /**
   * Calcula los costos variables totales del producto
   */
  calculateVariableCosts(costs: Cost[]): number {
    return costs
      .filter(c => [CostType.VARIABLE, CostType.LABOR, CostType.OVERHEAD, CostType.SHIPPING].includes(c.type) && !c.isPercentage)
      .reduce((sum, cost) => sum + cost.value, 0);
  }

  /**
   * Calcula el total de costos por tipo
   */
  getCostsByType(costs: Cost[]): { [key: string]: number } {
    const result: { [key: string]: number } = {};
    
    Object.values(CostType).forEach(type => {
      const costsOfType = costs.filter(c => c.type === type && !c.isPercentage);
      result[type] = costsOfType.reduce((sum, cost) => sum + cost.value, 0);
    });

    return result;
  }

  /**
   * Calcula el precio con un margen específico
   */
  calculatePriceWithMargin(totalCosts: number, marginPercentage: number): number {
    return totalCosts * (1 + marginPercentage / 100);
  }

  /**
   * Calcula el margen de ganancia dado un precio y costos
   */
  calculateMargin(price: number, costs: number): number {
    if (price === 0) return 0;
    return ((price - costs) / price) * 100;
  }

  /**
   * Calcula la ganancia neta
   */
  calculateProfit(price: number, costs: number, quantity: number = 1): number {
    return (price - costs) * quantity;
  }

  /**
   * Simula diferentes escenarios de precios
   */
  simulatePriceScenarios(
    product: Product, 
    costs: Cost[], 
    businessFixedCosts: BusinessFixedCost[],
    allProducts: Product[]
  ): Array<{
    margin: number;
    price: number;
    profit: number;
    profitMargin: number;
  }> {
    const directCosts = this.calculateDirectCosts(costs);
    const allocatedFixedCosts = this.allocateFixedCostsToProduct(product, businessFixedCosts, allProducts);
    const totalCosts = directCosts + allocatedFixedCosts;
    const margins = [10, 20, 30, 40, 50, 60, 70, 80];

    return margins.map(margin => {
      const price = this.calculatePriceWithMargin(totalCosts, margin);
      const profit = price - totalCosts;
      const profitMargin = this.calculateMargin(price, totalCosts);

      return {
        margin,
        price,
        profit,
        profitMargin
      };
    });
  }
}
