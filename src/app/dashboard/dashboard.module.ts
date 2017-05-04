import {NgModule, ModuleWithProviders} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {NewPaymentComponent} from "./components/new-payment/new-payment.component";
import {AllTransactionsComponent} from "./components/all-transactions/all-transactions.component";
import {LatestTransactionsComponent} from "./components/latest-transactions/latest-transactions.component";
import {TransactionTableComponent} from "./components/transaction-table/transaction-table.component";
import {OverviewComponent} from "./components/overview/overview.component";

import {SharedModule} from "../shared/shared.module";

import {AccountService} from "./services/account.service";
import {TransactionService} from "./services/transaction.service";

import {AccountResource} from "./resources/account.resource";
import {TransactionResource} from "./resources/transaction.resource";

import {AuthGuard} from "../auth/guards/auth.guard";

@NgModule({
  declarations: [
    DashboardComponent,
    NewPaymentComponent,
    LatestTransactionsComponent,
    AllTransactionsComponent,
    OverviewComponent,
    TransactionTableComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [
    AuthGuard,
    TransactionService,
    TransactionResource,
    AccountService,
    AccountResource
  ]
})
export class DashboardModule {
  static forRoot(config?: {}): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: []
    };
  }
}
