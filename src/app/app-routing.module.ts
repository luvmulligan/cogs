import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CostCalculatorComponent } from './components/cost-calculator/cost-calculator.component';
import { PriceAnalysisComponent } from './components/price-analysis/price-analysis.component';
import { EducationalGuideComponent } from './components/educational-guide/educational-guide.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'calculator', component: CostCalculatorComponent, canActivate: [AuthGuard] },
  { path: 'analysis', component: PriceAnalysisComponent, canActivate: [AuthGuard] },
  { path: 'education', component: EducationalGuideComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
