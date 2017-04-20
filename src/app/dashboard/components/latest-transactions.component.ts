import {Component, OnInit} from '@angular/core';
import {Transaction} from "../models/transaction";
import {ConsolePipe} from "../../shared/console.pipe";
import {TransactionService} from "../services/transaction.service";
import {NavigationService} from "../../core/services/navigation.service";

@Component({
  selector: 'app-latest-transactions',
  templateUrl: 'latest-transactions.component.html'
})
export class LatestTransactionsComponent implements OnInit {
  private transactions: Transaction[] = [];

  constructor(private service: TransactionService, private navSrvc: NavigationService) {
  }

  ngOnInit() {
    this.service.lastTransactionChange.subscribe(
      (transactions: Transaction[]) => {
        this.transactions = transactions;
      });
    this.service.updateLatestTransactions();
  }

  public goToAllTransaction() {
    this.navSrvc.goToAllTransactions();
  }
}



