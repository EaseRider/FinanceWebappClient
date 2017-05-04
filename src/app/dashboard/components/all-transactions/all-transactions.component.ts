import { Component, OnInit } from '@angular/core';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import * as moment from 'moment';
import { TransactionService } from '../../services/transaction.service';
import { TransactionModel } from '../../models/transaction.model';
import { TransactionFilter } from '../../models/transaction-filter.model';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss'],
  providers: [TransactionTableComponent]
})
export class AllTransactionsComponent implements OnInit {

  private transactions: TransactionModel[];
  private monthSelected = moment().month();
  private months = Array(12).fill(0).map(function(_, idx) {
    const monthText = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    return {key: idx, value: idx, text: monthText[idx]};
  });
  private yearSelected = moment().year();
  private years = Array(3).fill(moment().year()).map(function(maxYear, idx) {
    const year = maxYear - idx;
    return {key: year, value: year, text: year};
  });

  constructor(private transSvc: TransactionService) {
  }

  ngOnInit() {
    this.transSvc.lastTransactionChange.subscribe((t) => {
      this.transactions = t.map((x) => x.toDto());
    });
    this.updateTransactionData(this.yearSelected, this.monthSelected);
  }

  updateTransactionData(selectedYear, selectedMonth) {
    const from = new Date(selectedYear, selectedMonth, 1).toJSON();
    const to = (selectedMonth + 1) % 12 !== 0
              ? new Date(selectedYear, selectedMonth + 1, 1).toJSON()
              : new Date(selectedYear + 1, 0, 1).toJSON();
    const options = new TransactionFilter(99999, 0, from, to);
    this.transSvc.updateLatestTransactions(options);
  }

  formatDate(dateString) {
    return moment(dateString).format('DD.MM.YYYY HH:mm');
  }

  inputChanged() {
    this.updateTransactionData(this.yearSelected, this.monthSelected);
  }
}
