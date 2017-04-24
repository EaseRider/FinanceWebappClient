import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard.component";
import {AllTransactionsComponent} from "./components/all-transactions.component";
import {AuthGuard} from "../auth/services/authguard.service";
//import {AuthGuard} from "../auth/auth-guard";

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent, // TODO: Add initial router outlet dashboard component...
    children: [
      // TODO: Add routing path for dashboard here...
    ],
  },
  {path: 'transactions', component: AllTransactionsComponent}
  //{path: 'dashboard/transactions', component: AllTransactionsComponent}
];


@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class DashbaordRoutingModule {
}
