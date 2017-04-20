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
    canActivate: ['checkActivation'],
    canActivateChild: ['checkActivation'],
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
  providers: [
    {
      provide: 'checkActivation',
      useValue: (route: any, state: any) => {
        // This would be called, but Router is quite shitty.
        console.log('Hallo Is Called From Can Activate this fucking route!', route, state);
        return true;
      }
    }
  ]
})
export class DashbaordRoutingModule {
}
