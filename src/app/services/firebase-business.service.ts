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
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Business, Product, Cost, BusinessFixedCost } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBusinessService {
  private businessesSubject = new BehaviorSubject<Business[]>([]);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private costsSubject = new BehaviorSubject<Cost[]>([]);
  private businessFixedCostsSubject = new BehaviorSubject<BusinessFixedCost[]>([]);

  businesses$ = this.businessesSubject.asObservable();
  products$ = this.productsSubject.asObservable();
  costs$ = this.costsSubject.asObservable();
  businessFixedCosts$ = this.businessFixedCostsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadData();
  }

  private loadData(): void {
    // Load businesses
    const businessesRef = collection(this.firestore, 'businesses');
    collectionData(businessesRef, { idField: 'id' }).subscribe((businesses: any[]) => {
      this.businessesSubject.next(businesses as Business[]);
    });

    // Load products
    const productsRef = collection(this.firestore, 'products');
    collectionData(productsRef, { idField: 'id' }).subscribe((products: any[]) => {
      this.productsSubject.next(products as Product[]);
    });

    // Load costs
    const costsRef = collection(this.firestore, 'costs');
    collectionData(costsRef, { idField: 'id' }).subscribe((costs: any[]) => {
      this.costsSubject.next(costs as Cost[]);
    });

    // Load business fixed costs
    const fixedCostsRef = collection(this.firestore, 'businessFixedCosts');
    collectionData(fixedCostsRef, { idField: 'id' }).subscribe((fixedCosts: any[]) => {
      this.businessFixedCostsSubject.next(fixedCosts as BusinessFixedCost[]);
    });
  }

  // Business Management
  async addBusiness(business: Omit<Business, 'id' | 'createdAt'>): Promise<Business> {
    const businessesRef = collection(this.firestore, 'businesses');
    const newBusiness = {
      ...business,
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
    const productsRef = collection(this.firestore, 'products');
    const docRef = await addDoc(productsRef, product);
    return { ...product, id: docRef.id } as Product;
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
    const costsRef = collection(this.firestore, 'costs');
    const docRef = await addDoc(costsRef, cost);
    return { ...cost, id: docRef.id } as Cost;
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
    const fixedCostsRef = collection(this.firestore, 'businessFixedCosts');
    const docRef = await addDoc(fixedCostsRef, cost);
    return { ...cost, id: docRef.id } as BusinessFixedCost;
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
}
