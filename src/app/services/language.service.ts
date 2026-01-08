import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'es' | 'en';

export interface Translations {
  // Header
  appTitle: string;
  dashboard: string;
  calculator: string;
  analysis: string;
  education: string;
  logout: string;
  
  // Login
  loginTitle: string;
  loginSubtitle: string;
  googleSignIn: string;
  orSeparator: string;
  email: string;
  password: string;
  loginButton: string;
  registerButton: string;
  switchToRegister: string;
  switchToLogin: string;
  
  // Dashboard
  myBusinesses: string;
  createBusiness: string;
  businessName: string;
  businessNamePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  addBusinessButton: string;
  cancel: string;
  editBusiness: string;
  deleteBusiness: string;
  products: string;
  addProduct: string;
  manageFixedCosts: string;
  manageAssets: string;
  productName: string;
  productNamePlaceholder: string;
  directCost: string;
  expectedUnits: string;
  editProduct: string;
  deleteProduct: string;
  fixedCostsTitle: string;
  fixedCostsInfo: string;
  concept: string;
  conceptPlaceholder: string;
  monthlyCost: string;
  addCostButton: string;
  totalFixedCosts: string;
  assetsTitle: string;
  assetsInfo: string;
  assetName: string;
  assetNamePlaceholder: string;
  assetType: string;
  purchaseValue: string;
  estimatedDuration: string;
  estimatedDurationHint: string;
  monthlyDepreciation: string;
  addAssetButton: string;
  totalDepreciation: string;
  combinedFixedCosts: string;
  traditionalCosts: string;
  assetDepreciation: string;
  totalCombined: string;
  
  // Asset Types
  assetMachinery: string;
  assetEquipment: string;
  assetTools: string;
  assetFurniture: string;
  assetVehicle: string;
  assetTechnology: string;
  assetOther: string;
  
  // Business Form
  businessFormTitle: string;
  businessFormEdit: string;
  save: string;
  
  // Product Form
  productFormTitle: string;
  productFormEdit: string;
  
  // Cost Calculator
  calculatorTitle: string;
  calculatorSubtitle: string;
  selectBusiness: string;
  selectBusinessPlaceholder: string;
  selectProduct: string;
  selectProductPlaceholder: string;
  profitMargin: string;
  profitMarginHint: string;
  calculatePrice: string;
  resultsTitle: string;
  productCost: string;
  allocatedFixedCost: string;
  totalCost: string;
  suggestedPrice: string;
  unitProfit: string;
  costBreakdown: string;
  noBusinesses: string;
  noProducts: string;
  fillAllFields: string;
  
  // Price Analysis
  analysisTitle: string;
  analysisSubtitle: string;
  currentPrice: string;
  currentPriceHint: string;
  analyzeButton: string;
  priceAnalysisResults: string;
  yourPrice: string;
  minPrice: string;
  minPriceDesc: string;
  optimalPrice: string;
  optimalPriceDesc: string;
  margin: string;
  recommendation: string;
  recGood: string;
  recLow: string;
  recHigh: string;
  distributionTitle: string;
  directCostLabel: string;
  fixedCostLabel: string;
  profitLabel: string;
  
  // Educational Guide
  guideTitle: string;
  guideSubtitle: string;
  searchPlaceholder: string;
  allCategories: string;
  allLevels: string;
  minutesRead: string;
  readMore: string;
  backToGuide: string;
  noArticles: string;
  
  // Education Categories
  categoryBasics: string;
  categoryCosts: string;
  categoryPricing: string;
  categoryMargins: string;
  categoryAnalysis: string;
  categoryAssets: string;
  
  // Education Levels
  levelBeginner: string;
  levelIntermediate: string;
  levelAdvanced: string;
  
  // Common
  months: string;
  monthly: string;
  delete: string;
  edit: string;
  add: string;
  close: string;
  optional: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<Language>('es');
  public language$ = this.languageSubject.asObservable();

  private translations: Record<Language, Translations> = {
    es: {
      // Header
      appTitle: 'Calculadora de Costos',
      dashboard: 'Panel',
      calculator: 'Calculadora',
      analysis: 'Análisis',
      education: 'Guía',
      logout: 'Cerrar Sesión',
      
      // Login
      loginTitle: 'Bienvenido',
      loginSubtitle: 'Inicia sesión para gestionar tus negocios',
      googleSignIn: 'Continuar con Google',
      orSeparator: 'O',
      email: 'Correo electrónico',
      password: 'Contraseña',
      loginButton: 'Iniciar Sesión',
      registerButton: 'Registrarse',
      switchToRegister: '¿No tienes cuenta? Regístrate',
      switchToLogin: '¿Ya tienes cuenta? Inicia sesión',
      
      // Dashboard
      myBusinesses: 'Mis Negocios',
      createBusiness: 'Crear Negocio',
      businessName: 'Nombre del negocio',
      businessNamePlaceholder: 'Mi Panadería',
      description: 'Descripción',
      descriptionPlaceholder: 'Describe tu negocio',
      addBusinessButton: 'Agregar Negocio',
      cancel: 'Cancelar',
      editBusiness: 'Editar Negocio',
      deleteBusiness: 'Eliminar Negocio',
      products: 'Productos',
      addProduct: 'Agregar Producto',
      manageFixedCosts: 'Gestionar Costos Fijos',
      manageAssets: 'Gestionar Activos',
      productName: 'Nombre del producto',
      productNamePlaceholder: 'Pan de molde',
      directCost: 'Costo directo',
      expectedUnits: 'Unidades esperadas/mes',
      editProduct: 'Editar Producto',
      deleteProduct: 'Eliminar Producto',
      fixedCostsTitle: 'Costos Fijos Mensuales',
      fixedCostsInfo: 'Los costos fijos son gastos que pagas cada mes independientemente de cuánto vendas (alquiler, servicios, salarios, etc.)',
      concept: 'Concepto',
      conceptPlaceholder: 'Alquiler del local',
      monthlyCost: 'Costo mensual',
      addCostButton: 'Agregar Costo',
      totalFixedCosts: 'Total costos fijos',
      assetsTitle: 'Activos e Inversiones',
      assetsInfo: 'Los activos son inversiones únicas (herramientas, maquinaria, equipos) cuyo costo se distribuye a lo largo del tiempo según su duración estimada de uso.',
      assetName: 'Nombre del activo',
      assetNamePlaceholder: 'Horno Industrial',
      assetType: 'Tipo',
      purchaseValue: 'Valor de compra',
      estimatedDuration: 'Duración estimada (meses)',
      estimatedDurationHint: 'En cuántos meses esperas recuperar esta inversión',
      monthlyDepreciation: 'Depreciación mensual',
      addAssetButton: 'Agregar Activo',
      totalDepreciation: 'Total depreciación mensual',
      combinedFixedCosts: 'Resumen de Costos Fijos Totales',
      traditionalCosts: 'Costos fijos tradicionales',
      assetDepreciation: 'Depreciación de activos',
      totalCombined: 'Total combinado',
      
      // Asset Types
      assetMachinery: 'Maquinaria',
      assetEquipment: 'Equipo',
      assetTools: 'Herramientas',
      assetFurniture: 'Mobiliario',
      assetVehicle: 'Vehículo',
      assetTechnology: 'Tecnología',
      assetOther: 'Otro',
      
      // Business Form
      businessFormTitle: 'Nuevo Negocio',
      businessFormEdit: 'Editar Negocio',
      save: 'Guardar',
      
      // Product Form
      productFormTitle: 'Nuevo Producto',
      productFormEdit: 'Editar Producto',
      
      // Cost Calculator
      calculatorTitle: 'Calculadora de Precios',
      calculatorSubtitle: 'Calcula el precio óptimo para tus productos',
      selectBusiness: 'Selecciona un negocio',
      selectBusinessPlaceholder: 'Elige un negocio',
      selectProduct: 'Selecciona un producto',
      selectProductPlaceholder: 'Elige un producto',
      profitMargin: 'Margen de ganancia deseado (%)',
      profitMarginHint: 'Porcentaje de ganancia sobre el costo total',
      calculatePrice: 'Calcular Precio',
      resultsTitle: 'Resultados del Cálculo',
      productCost: 'Costo del producto',
      allocatedFixedCost: 'Costo fijo asignado',
      totalCost: 'Costo total',
      suggestedPrice: 'Precio sugerido de venta',
      unitProfit: 'Ganancia por unidad',
      costBreakdown: 'Distribución de Costos',
      noBusinesses: 'No hay negocios registrados. Crea uno primero.',
      noProducts: 'No hay productos para este negocio.',
      fillAllFields: 'Por favor completa todos los campos',
      
      // Price Analysis
      analysisTitle: 'Análisis de Precios',
      analysisSubtitle: 'Analiza si tu precio actual es competitivo',
      currentPrice: 'Precio actual de venta',
      currentPriceHint: 'El precio al que vendes actualmente',
      analyzeButton: 'Analizar Precio',
      priceAnalysisResults: 'Análisis de tu Precio',
      yourPrice: 'Tu precio',
      minPrice: 'Precio mínimo',
      minPriceDesc: 'Precio mínimo para cubrir costos',
      optimalPrice: 'Precio óptimo',
      optimalPriceDesc: 'Precio con 30% de margen',
      margin: 'Margen',
      recommendation: 'Recomendación',
      recGood: 'Tu precio es competitivo y rentable',
      recLow: 'Tu precio está por debajo del costo. Considera aumentarlo',
      recHigh: 'Tu precio es alto. Considera reducirlo para ser más competitivo',
      distributionTitle: 'Distribución de tu Precio',
      directCostLabel: 'Costo Directo',
      fixedCostLabel: 'Costo Fijo',
      profitLabel: 'Ganancia',
      
      // Educational Guide
      guideTitle: 'Guía Educativa',
      guideSubtitle: 'Aprende sobre costos, precios y gestión financiera',
      searchPlaceholder: 'Buscar artículos...',
      allCategories: 'Todas las categorías',
      allLevels: 'Todos los niveles',
      minutesRead: 'min de lectura',
      readMore: 'Leer más',
      backToGuide: 'Volver a la guía',
      noArticles: 'No se encontraron artículos',
      
      // Education Categories
      categoryBasics: 'Fundamentos',
      categoryCosts: 'Costos',
      categoryPricing: 'Fijación de Precios',
      categoryMargins: 'Márgenes',
      categoryAnalysis: 'Análisis',
      categoryAssets: 'Activos',
      
      // Education Levels
      levelBeginner: 'Principiante',
      levelIntermediate: 'Intermedio',
      levelAdvanced: 'Avanzado',
      
      // Common
      months: 'meses',
      monthly: 'mensual',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Agregar',
      close: 'Cerrar',
      optional: 'opcional',
    },
    en: {
      // Header
      appTitle: 'Cost Calculator',
      dashboard: 'Dashboard',
      calculator: 'Calculator',
      analysis: 'Analysis',
      education: 'Guide',
      logout: 'Sign Out',
      
      // Login
      loginTitle: 'Welcome',
      loginSubtitle: 'Sign in to manage your businesses',
      googleSignIn: 'Continue with Google',
      orSeparator: 'OR',
      email: 'Email',
      password: 'Password',
      loginButton: 'Sign In',
      registerButton: 'Sign Up',
      switchToRegister: "Don't have an account? Sign up",
      switchToLogin: 'Already have an account? Sign in',
      
      // Dashboard
      myBusinesses: 'My Businesses',
      createBusiness: 'Create Business',
      businessName: 'Business name',
      businessNamePlaceholder: 'My Bakery',
      description: 'Description',
      descriptionPlaceholder: 'Describe your business',
      addBusinessButton: 'Add Business',
      cancel: 'Cancel',
      editBusiness: 'Edit Business',
      deleteBusiness: 'Delete Business',
      products: 'Products',
      addProduct: 'Add Product',
      manageFixedCosts: 'Manage Fixed Costs',
      manageAssets: 'Manage Assets',
      productName: 'Product name',
      productNamePlaceholder: 'Sliced bread',
      directCost: 'Direct cost',
      expectedUnits: 'Expected units/month',
      editProduct: 'Edit Product',
      deleteProduct: 'Delete Product',
      fixedCostsTitle: 'Monthly Fixed Costs',
      fixedCostsInfo: 'Fixed costs are expenses you pay every month regardless of how much you sell (rent, utilities, salaries, etc.)',
      concept: 'Concept',
      conceptPlaceholder: 'Store rent',
      monthlyCost: 'Monthly cost',
      addCostButton: 'Add Cost',
      totalFixedCosts: 'Total fixed costs',
      assetsTitle: 'Assets & Investments',
      assetsInfo: 'Assets are one-time investments (tools, machinery, equipment) whose cost is distributed over time according to their estimated useful life.',
      assetName: 'Asset name',
      assetNamePlaceholder: 'Industrial Oven',
      assetType: 'Type',
      purchaseValue: 'Purchase value',
      estimatedDuration: 'Estimated duration (months)',
      estimatedDurationHint: 'How many months do you expect to recover this investment',
      monthlyDepreciation: 'Monthly depreciation',
      addAssetButton: 'Add Asset',
      totalDepreciation: 'Total monthly depreciation',
      combinedFixedCosts: 'Total Fixed Costs Summary',
      traditionalCosts: 'Traditional fixed costs',
      assetDepreciation: 'Asset depreciation',
      totalCombined: 'Combined total',
      
      // Asset Types
      assetMachinery: 'Machinery',
      assetEquipment: 'Equipment',
      assetTools: 'Tools',
      assetFurniture: 'Furniture',
      assetVehicle: 'Vehicle',
      assetTechnology: 'Technology',
      assetOther: 'Other',
      
      // Business Form
      businessFormTitle: 'New Business',
      businessFormEdit: 'Edit Business',
      save: 'Save',
      
      // Product Form
      productFormTitle: 'New Product',
      productFormEdit: 'Edit Product',
      
      // Cost Calculator
      calculatorTitle: 'Price Calculator',
      calculatorSubtitle: 'Calculate the optimal price for your products',
      selectBusiness: 'Select a business',
      selectBusinessPlaceholder: 'Choose a business',
      selectProduct: 'Select a product',
      selectProductPlaceholder: 'Choose a product',
      profitMargin: 'Desired profit margin (%)',
      profitMarginHint: 'Profit percentage on total cost',
      calculatePrice: 'Calculate Price',
      resultsTitle: 'Calculation Results',
      productCost: 'Product cost',
      allocatedFixedCost: 'Allocated fixed cost',
      totalCost: 'Total cost',
      suggestedPrice: 'Suggested selling price',
      unitProfit: 'Profit per unit',
      costBreakdown: 'Cost Breakdown',
      noBusinesses: 'No businesses registered. Create one first.',
      noProducts: 'No products for this business.',
      fillAllFields: 'Please fill in all fields',
      
      // Price Analysis
      analysisTitle: 'Price Analysis',
      analysisSubtitle: 'Analyze if your current price is competitive',
      currentPrice: 'Current selling price',
      currentPriceHint: 'The price you currently charge',
      analyzeButton: 'Analyze Price',
      priceAnalysisResults: 'Your Price Analysis',
      yourPrice: 'Your price',
      minPrice: 'Minimum price',
      minPriceDesc: 'Minimum price to cover costs',
      optimalPrice: 'Optimal price',
      optimalPriceDesc: 'Price with 30% margin',
      margin: 'Margin',
      recommendation: 'Recommendation',
      recGood: 'Your price is competitive and profitable',
      recLow: 'Your price is below cost. Consider raising it',
      recHigh: 'Your price is high. Consider lowering it to be more competitive',
      distributionTitle: 'Your Price Distribution',
      directCostLabel: 'Direct Cost',
      fixedCostLabel: 'Fixed Cost',
      profitLabel: 'Profit',
      
      // Educational Guide
      guideTitle: 'Educational Guide',
      guideSubtitle: 'Learn about costs, pricing and financial management',
      searchPlaceholder: 'Search articles...',
      allCategories: 'All categories',
      allLevels: 'All levels',
      minutesRead: 'min read',
      readMore: 'Read more',
      backToGuide: 'Back to guide',
      noArticles: 'No articles found',
      
      // Education Categories
      categoryBasics: 'Basics',
      categoryCosts: 'Costs',
      categoryPricing: 'Pricing',
      categoryMargins: 'Margins',
      categoryAnalysis: 'Analysis',
      categoryAssets: 'Assets',
      
      // Education Levels
      levelBeginner: 'Beginner',
      levelIntermediate: 'Intermediate',
      levelAdvanced: 'Advanced',
      
      // Common
      months: 'months',
      monthly: 'monthly',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      close: 'Close',
      optional: 'optional',
    }
  };

  constructor() {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('appLanguage') as Language;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      this.languageSubject.next(savedLang);
    }
  }

  getCurrentLanguage(): Language {
    return this.languageSubject.value;
  }

  setLanguage(lang: Language): void {
    this.languageSubject.next(lang);
    localStorage.setItem('appLanguage', lang);
  }

  getTranslations(): Translations {
    return this.translations[this.languageSubject.value];
  }

  translate(key: keyof Translations): string {
    return this.translations[this.languageSubject.value][key];
  }
}
