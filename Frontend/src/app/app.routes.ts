import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/reg', component: RegComponent },
  { path: 'account/auth', component: AuthComponent },
  {
    path: 'account/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
