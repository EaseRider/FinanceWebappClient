import {NgModule, ModuleWithProviders} from '@angular/core';

import {SharedModule} from "../shared/shared.module";

import {DashbaordRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from './components/dashboard.component';
import {NewPaymentComponent} from './components/new-payment.component';
import {LatestTransactionsComponent} from './components/latest-transactions.component';
import {AllTransactionsComponent} from "./components/all-transactions.component";
import {TransactionService} from "./services/transaction.service";
import {DashboardResourceService} from "./resources/dashboard-resource.service";

@NgModule({
  declarations: [
    // Declarations (Components / Directives) used from/within the Module
    DashboardComponent,
    NewPaymentComponent,
    LatestTransactionsComponent,
    AllTransactionsComponent],
  imports: [
    // Other Modules to import (imports the exported Components/Directives from the other module)
    SharedModule, DashbaordRoutingModule
  ],
  exports: [
    // Components/Directives (or even Modules) to export (available for other modules; and forRoot() )
  ],
  providers: [
    // DI Providers (Services, Tokens, Factories...), may be instantiated multiple times
  ]
})
export class DashboardModule {
  static forRoot(config?: {}): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [
        TransactionService,
        DashboardResourceService]
    };
  }

}
