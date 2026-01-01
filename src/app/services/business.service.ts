import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Business, Product, Cost, BusinessFixedCost, CostType } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private businessesSubject = new BehaviorSubject<Business[]>(this.loadBusinesses());
  private productsSubject = new BehaviorSubject<Product[]>(this.loadProducts());
  private costsSubject = new BehaviorSubject<Cost[]>(this.loadCosts());
  private businessFixedCostsSubject = new BehaviorSubject<BusinessFixedCost[]>(this.loadBusinessFixedCosts());

  businesses$ = this.businessesSubject.asObservable();
  products$ = this.productsSubject.asObservable();
  costs$ = this.costsSubject.asObservable();
  businessFixedCosts$ = this.businessFixedCostsSubject.asObservable();

  constructor() {}

  // Business Management
  addBusiness(business: Omit<Business, 'id' | 'createdAt'>): Business {
    const newBusiness: Business = {
      ...business,
      id: this.generateId(),
      createdAt: new Date()
    };
    
    const businesses = this.businessesSubject.value;
    businesses.push(newBusiness);
    this.saveBusinesses(businesses);
    this.businessesSubject.next(businesses);
    return newBusiness;
  }

  getBusinesses(): Business[] {
    return this.businessesSubject.value;
  }

  getBusiness(id: string): Business | undefined {
    return this.businessesSubject.value.find(b => b.id === id);
  }

  updateBusiness(id: string, updates: Partial<Business>): void {
    const businesses = this.businessesSubject.value;
    const index = businesses.findIndex(b => b.id === id);
    if (index !== -1) {
      businesses[index] = { ...businesses[index], ...updates };
      this.saveBusinesses(businesses);
      this.businessesSubject.next(businesses);
    }
  }

  // Business Fixed Costs Management
  addBusinessFixedCost(cost: Omit<BusinessFixedCost, 'id'>): BusinessFixedCost {
    const newCost: BusinessFixedCost = {
      ...cost,
      id: this.generateId()
    };
    
    const costs = this.businessFixedCostsSubject.value;
    costs.push(newCost);
    this.saveBusinessFixedCosts(costs);
    this.businessFixedCostsSubject.next(costs);
    return newCost;
  }

  getBusinessFixedCosts(): BusinessFixedCost[] {
    return this.businessFixedCostsSubject.value;
  }

  getBusinessFixedCostsByBusiness(businessId: string): BusinessFixedCost[] {
    return this.businessFixedCostsSubject.value.filter(c => c.businessId === businessId);
  }

  updateBusinessFixedCost(id: string, updates: Partial<BusinessFixedCost>): void {
    const costs = this.businessFixedCostsSubject.value;
    const index = costs.findIndex(c => c.id === id);
    if (index !== -1) {
      costs[index] = { ...costs[index], ...updates };
      this.saveBusinessFixedCosts(costs);
      this.businessFixedCostsSubject.next(costs);
    }
  }

  deleteBusinessFixedCost(id: string): void {
    const costs = this.businessFixedCostsSubject.value.filter(c => c.id !== id);
    this.saveBusinessFixedCosts(costs);
    this.businessFixedCostsSubject.next(costs);
  }

  getTotalBusinessFixedCosts(businessId: string): number {
    return this.getBusinessFixedCostsByBusiness(businessId)
      .reduce((total, cost) => total + cost.monthlyValue, 0);
  }

  // Product Management
  addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: this.generateId()
    };
    
    const products = this.productsSubject.value;
    products.push(newProduct);
    this.saveProducts(products);
    this.productsSubject.next(products);
    return newProduct;
  }

  getProducts(): Product[] {
    return this.productsSubject.value;
  }

  getProductsByBusiness(businessId: string): Product[] {
    return this.productsSubject.value.filter(p => p.businessId === businessId);
  }

  getProduct(id: string): Product | undefined {
    return this.productsSubject.value.find(p => p.id === id);
  }

  updateProduct(id: string, updates: Partial<Product>): void {
    const products = this.productsSubject.value;
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.saveProducts(products);
      this.productsSubject.next(products);
    }
  }

  deleteProduct(id: string): void {
    const products = this.productsSubject.value.filter(p => p.id !== id);
    const costs = this.costsSubject.value.filter(c => c.productId !== id);
    this.saveProducts(products);
    this.saveCosts(costs);
    this.productsSubject.next(products);
    this.costsSubject.next(costs);
  }

  // Cost Management
  addCost(cost: Omit<Cost, 'id'>): Cost {
    const newCost: Cost = {
      ...cost,
      id: this.generateId()
    };
    
    const costs = this.costsSubject.value;
    costs.push(newCost);
    this.saveCosts(costs);
    this.costsSubject.next(costs);
    return newCost;
  }

  getCosts(): Cost[] {
    return this.costsSubject.value;
  }

  getCostsByProduct(productId: string): Cost[] {
    return this.costsSubject.value.filter(c => c.productId === productId);
  }

  updateCost(id: string, updates: Partial<Cost>): void {
    const costs = this.costsSubject.value;
    const index = costs.findIndex(c => c.id === id);
    if (index !== -1) {
      costs[index] = { ...costs[index], ...updates };
      this.saveCosts(costs);
      this.costsSubject.next(costs);
    }
  }

  deleteCost(id: string): void {
    const costs = this.costsSubject.value.filter(c => c.id !== id);
    this.saveCosts(costs);
    this.costsSubject.next(costs);
  }

  // Local Storage
  private loadBusinesses(): Business[] {
    const data = localStorage.getItem('businesses');
    return data ? JSON.parse(data) : [];
  }

  private saveBusinesses(businesses: Business[]): void {
    localStorage.setItem('businesses', JSON.stringify(businesses));
  }

  private loadProducts(): Product[] {
    const data = localStorage.getItem('products');
    return data ? JSON.parse(data) : [];
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  private loadCosts(): Cost[] {
    const data = localStorage.getItem('costs');
    return data ? JSON.parse(data) : [];
  }

  private saveCosts(costs: Cost[]): void {
    localStorage.setItem('costs', JSON.stringify(costs));
  }

  private loadBusinessFixedCosts(): BusinessFixedCost[] {
    const data = localStorage.getItem('businessFixedCosts');
    return data ? JSON.parse(data) : [];
  }

  private saveBusinessFixedCosts(costs: BusinessFixedCost[]): void {
    localStorage.setItem('businessFixedCosts', JSON.stringify(costs));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
