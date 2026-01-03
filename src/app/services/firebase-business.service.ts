import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  addDoc
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Business, Product, Cost, BusinessFixedCost, Asset } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBusinessService {
  private businessesSubject = new BehaviorSubject<Business[]>([]);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private costsSubject = new BehaviorSubject<Cost[]>([]);
  private businessFixedCostsSubject = new BehaviorSubject<BusinessFixedCost[]>([]);
  private assetsSubject = new BehaviorSubject<Asset[]>([]);

  businesses$ = this.businessesSubject.asObservable();
  products$ = this.productsSubject.asObservable();
  costs$ = this.costsSubject.asObservable();
  businessFixedCosts$ = this.businessFixedCostsSubject.asObservable();
  assets$ = this.assetsSubject.asObservable();

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {
    this.loadData();
  }

  private loadData(): void {
    // Solo cargar datos cuando hay un usuario autenticado
    this.auth.onAuthStateChanged(user => {
      if (user) {
        // Load businesses for current user
        const businessesRef = collection(this.firestore, 'businesses');
        const businessesQuery = query(businessesRef, where('userId', '==', user.uid));
        collectionData(businessesQuery, { idField: 'id' }).subscribe((businesses: any[]) => {
          this.businessesSubject.next(businesses as Business[]);
        });

        // Load products for current user
        const productsRef = collection(this.firestore, 'products');
        const productsQuery = query(productsRef, where('userId', '==', user.uid));
        collectionData(productsQuery, { idField: 'id' }).subscribe((products: any[]) => {
          this.productsSubject.next(products as Product[]);
        });

        // Load costs for current user
        const costsRef = collection(this.firestore, 'costs');
        const costsQuery = query(costsRef, where('userId', '==', user.uid));
        collectionData(costsQuery, { idField: 'id' }).subscribe((costs: any[]) => {
          this.costsSubject.next(costs as Cost[]);
        });

        // Load business fixed costs for current user
        const fixedCostsRef = collection(this.firestore, 'businessFixedCosts');
        const fixedCostsQuery = query(fixedCostsRef, where('userId', '==', user.uid));
        collectionData(fixedCostsQuery, { idField: 'id' }).subscribe((fixedCosts: any[]) => {
          this.businessFixedCostsSubject.next(fixedCosts as BusinessFixedCost[]);
        });

        // Load assets for current user
        const assetsRef = collection(this.firestore, 'assets');
        const assetsQuery = query(assetsRef, where('userId', '==', user.uid));
        collectionData(assetsQuery, { idField: 'id' }).subscribe((assets: any[]) => {
          this.assetsSubject.next(assets as Asset[]);
        });
      } else {
        // Limpiar datos cuando no hay usuario
        this.businessesSubject.next([]);
        this.productsSubject.next([]);
        this.costsSubject.next([]);
        this.businessFixedCostsSubject.next([]);
        this.assetsSubject.next([]);
      }
    });
  }

  // Business Management
  async addBusiness(business: Omit<Business, 'id' | 'createdAt'>): Promise<Business> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    
    const businessesRef = collection(this.firestore, 'businesses');
    const newBusiness = {
      ...business,
      userId: user.uid,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(businessesRef, newBusiness);
    return { ...newBusiness, id: docRef.id } as Business;
  }

  getBusinesses(): Business[] {
    return this.businessesSubject.value;
  }

  getBusiness(id: string): Business | undefined {
    return this.businessesSubject.value.find(b => b.id === id);
  }

  async updateBusiness(id: string, updates: Partial<Business>): Promise<void> {
    const businessDoc = doc(this.firestore, 'businesses', id);
    await updateDoc(businessDoc, updates);
  }

  async deleteBusiness(id: string): Promise<void> {
    const businessDoc = doc(this.firestore, 'businesses', id);
    await deleteDoc(businessDoc);
  }

  // Product Management
  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    
    const productsRef = collection(this.firestore, 'products');
    const newProduct = {
      ...product,
      userId: user.uid
    };
    const docRef = await addDoc(productsRef, newProduct);
    return { ...newProduct, id: docRef.id } as Product;
  }

  getProducts(): Product[] {
    return this.productsSubject.value;
  }

  getProduct(id: string): Product | undefined {
    return this.productsSubject.value.find(p => p.id === id);
  }

  getProductsByBusiness(businessId: string): Product[] {
    return this.productsSubject.value.filter(p => p.businessId === businessId);
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    const productDoc = doc(this.firestore, 'products', id);
    await updateDoc(productDoc, updates);
  }

  async deleteProduct(id: string): Promise<void> {
    const productDoc = doc(this.firestore, 'products', id);
    await deleteDoc(productDoc);
  }

  // Cost Management
  async addCost(cost: Omit<Cost, 'id'>): Promise<Cost> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    
    const costsRef = collection(this.firestore, 'costs');
    const newCost = {
      ...cost,
      userId: user.uid
    };
    const docRef = await addDoc(costsRef, newCost);
    return { ...newCost, id: docRef.id } as Cost;
  }

  getCosts(): Cost[] {
    return this.costsSubject.value;
  }

  getCostsByProduct(productId: string): Cost[] {
    return this.costsSubject.value.filter(c => c.productId === productId);
  }

  async updateCost(id: string, updates: Partial<Cost>): Promise<void> {
    const costDoc = doc(this.firestore, 'costs', id);
    await updateDoc(costDoc, updates);
  }

  async deleteCost(id: string): Promise<void> {
    const costDoc = doc(this.firestore, 'costs', id);
    await deleteDoc(costDoc);
  }

  // Business Fixed Costs Management
  async addBusinessFixedCost(cost: Omit<BusinessFixedCost, 'id'>): Promise<BusinessFixedCost> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    
    const fixedCostsRef = collection(this.firestore, 'businessFixedCosts');
    const newCost = {
      ...cost,
      userId: user.uid
    };
    const docRef = await addDoc(fixedCostsRef, newCost);
    return { ...newCost, id: docRef.id } as BusinessFixedCost;
  }

  getBusinessFixedCosts(): BusinessFixedCost[] {
    return this.businessFixedCostsSubject.value;
  }

  getBusinessFixedCostsByBusiness(businessId: string): BusinessFixedCost[] {
    return this.businessFixedCostsSubject.value.filter(c => c.businessId === businessId);
  }

  getTotalBusinessFixedCosts(businessId: string): number {
    return this.getBusinessFixedCostsByBusiness(businessId)
      .reduce((total, cost) => total + cost.monthlyValue, 0);
  }

  async updateBusinessFixedCost(id: string, updates: Partial<BusinessFixedCost>): Promise<void> {
    const costDoc = doc(this.firestore, 'businessFixedCosts', id);
    await updateDoc(costDoc, updates);
  }

  async deleteBusinessFixedCost(id: string): Promise<void> {
    const costDoc = doc(this.firestore, 'businessFixedCosts', id);
    await deleteDoc(costDoc);
  }

  // Assets Management
  async addAsset(asset: Omit<Asset, 'id'>): Promise<Asset> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    
    const assetsRef = collection(this.firestore, 'assets');
    const newAsset = {
      ...asset,
      userId: user.uid,
      purchaseDate: asset.purchaseDate || new Date()
    };
    const docRef = await addDoc(assetsRef, newAsset);
    return { ...newAsset, id: docRef.id } as Asset;
  }

  getAssets(): Asset[] {
    return this.assetsSubject.value;
  }

  getAsset(id: string): Asset | undefined {
    return this.assetsSubject.value.find(a => a.id === id);
  }

  getAssetsByBusiness(businessId: string): Asset[] {
    return this.assetsSubject.value.filter(a => a.businessId === businessId);
  }

  // Calcula la amortización mensual de un activo
  calculateMonthlyDepreciation(asset: Asset): number {
    return asset.purchaseValue / asset.usefulLifeMonths;
  }

  // Obtiene el total de amortizaciones mensuales de todos los activos de un negocio
  getTotalMonthlyDepreciation(businessId: string): number {
    return this.getAssetsByBusiness(businessId)
      .reduce((total, asset) => total + this.calculateMonthlyDepreciation(asset), 0);
  }

  // Obtiene el total de costos fijos incluyendo amortizaciones
  getTotalBusinessFixedCostsWithDepreciation(businessId: string): number {
    const fixedCosts = this.getTotalBusinessFixedCosts(businessId);
    const depreciation = this.getTotalMonthlyDepreciation(businessId);
    return fixedCosts + depreciation;
  }

  async updateAsset(id: string, updates: Partial<Asset>): Promise<void> {
    const assetDoc = doc(this.firestore, 'assets', id);
    await updateDoc(assetDoc, updates);
  }

  async deleteAsset(id: string): Promise<void> {
    const assetDoc = doc(this.firestore, 'assets', id);
    await deleteDoc(assetDoc);
  }
}
