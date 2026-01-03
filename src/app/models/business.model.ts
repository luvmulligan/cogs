// Modelos de datos para la aplicación

export interface Business {
  id: string;
  name: string;
  industry: string;
  description?: string;
  createdAt: Date;
  expectedMonthlyUnits?: number; // Total de unidades esperadas al mes (todos los productos)
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  targetMargin: number; // Margen de ganancia objetivo en porcentaje
  expectedMonthlyUnits?: number; // Unidades esperadas de este producto específico
}

// Costos fijos a nivel de negocio (alquiler, servicios, salarios administrativos)
export interface BusinessFixedCost {
  id: string;
  businessId: string;
  name: string;
  type: CostType;
  monthlyValue: number; // Valor mensual del costo fijo
  description?: string;
}

// Activos e inversiones (maquinaria, herramientas, equipos)
export interface Asset {
  id: string;
  businessId: string;
  name: string;
  type: AssetType;
  purchaseValue: number;     // Costo de compra/inversión inicial
  usefulLifeMonths: number;  // Vida útil en meses
  purchaseDate: Date;        // Fecha de compra
  description?: string;
}

export enum AssetType {
  MACHINERY = 'machinery',       // Maquinaria
  EQUIPMENT = 'equipment',       // Equipamiento
  TOOLS = 'tools',              // Herramientas
  FURNITURE = 'furniture',      // Mobiliario
  VEHICLE = 'vehicle',          // Vehículos
  TECHNOLOGY = 'technology',    // Tecnología (computadoras, software)
  OTHER = 'other'               // Otros
}

// Costos directos/variables a nivel de producto
export interface Cost {
  id: string;
  productId: string;
  name: string;
  type: CostType;
  value: number;
  isPercentage: boolean; // Si es porcentaje del precio o valor fijo
  description?: string;
}

export enum CostType {
  FIXED = 'fixed',           // Costos fijos del negocio (alquiler, servicios)
  VARIABLE = 'variable',     // Costos variables por producto (materiales, insumos)
  LABOR = 'labor',          // Mano de obra directa
  OVERHEAD = 'overhead',    // Gastos generales
  TAX = 'tax',             // Impuestos
  SHIPPING = 'shipping'    // Envío/logística
}

export interface PriceAnalysis {
  productId: string;
  totalCosts: number;
  directCosts: number;        // Costos directos del producto
  allocatedFixedCosts: number; // Porción de costos fijos del negocio asignados a este producto
  variableCosts: number;
  suggestedPrice: number;
  minimumPrice: number;
  targetPrice: number;
  profitMargin: number;
  profitMarginPercent: number;
  breakEvenUnits: number;
  fixedCostsPercent?: number;
}

export interface EducationalContent {
  id: string;
  title: string;
  category: EducationCategory;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutos
}

export enum EducationCategory {
  FIXED_COSTS = 'fixed_costs',
  VARIABLE_COSTS = 'variable_costs',
  PRICING = 'pricing',
  PROFIT_MARGIN = 'profit_margin',
  BREAK_EVEN = 'break_even',
  CASH_FLOW = 'cash_flow',
  ASSETS = 'assets'
}
