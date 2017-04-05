import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard.component";
import {AllTransactionsComponent} from "./components/all-transactions.component";

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent, // TODO: Add initial router outlet dashboard component...
    children: [
      // TODO: Add routing path for dashboard here...
    ]
  },
  {path: 'dashboard/transactions', component: AllTransactionsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashbaordRoutingModule {
}
