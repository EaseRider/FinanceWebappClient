import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AllTransactionsComponent} from "./components/all-transactions/all-transactions.component";
import {OverviewComponent} from "./components/overview/overview.component";
import {AuthGuard} from "../auth/guards/auth.guard";

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: OverviewComponent},
      {path: 'transactions', component: AllTransactionsComponent}
    ],
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
