import {Component, OnInit} from '@angular/core';

import {NavigationService} from "../../../core/services/navigation.service";
import {TransactionService} from "../../services/transaction.service";
import {TransactionModel} from "../../models/transaction.model";
import {TransactionFilter} from "../../models/transaction-filter.model";

import {TransactionTableComponent} from '../transaction-table/transaction-table.component';

import * as moment from 'moment';

@Component({
  selector: 'app-latest-transactions',
  templateUrl: './latest-transactions.component.html',
  providers: [TransactionTableComponent]
})
export class LatestTransactionsComponent implements OnInit {

  private transactions: TransactionModel[];

  constructor(private navigationService: NavigationService, private transactionService: TransactionService) {
  }

  ngOnInit() {
    this.transactionService.lastTransactionChange.subscribe((target) => {
      this.transactions = target.map((x) => x.toDto());
    });
    this.transactionService.reloadLatestTransactions.subscribe((target) => {
      this.updateTransactionData();
    });
    this.updateTransactionData();
  }

  showAll() {
    this.navigationService.goToAllTransactions();
  }

  updateTransactionData() {
    const from = moment().subtract(1, 'months').toISOString();
    const to = moment().toISOString();
    const options = new TransactionFilter(3, 0, from, to);
    this.transactionService.updateLatestTransactions(options);
  }

  formatDate(dateString) {
    return moment(dateString).fromNow();
  }
}
