import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CostCalculatorComponent } from './components/cost-calculator/cost-calculator.component';
import { PriceAnalysisComponent } from './components/price-analysis/price-analysis.component';
import { EducationalGuideComponent } from './components/educational-guide/educational-guide.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calculator', component: CostCalculatorComponent },
  { path: 'analysis', component: PriceAnalysisComponent },
  { path: 'education', component: EducationalGuideComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
