import {Component, OnInit} from '@angular/core';
import {Transaction} from "../models/transaction";
import {ConsolePipe} from "../../shared/console.pipe";
import {QueryInformation} from "../models/query-information";
import {TransactionService} from "../services/transaction.service";

@Component({
  selector: 'app-all-transactions',
  templateUrl: 'all-transactions.component.html'
})
export class AllTransactionsComponent implements OnInit {
  private transactions: Transaction[] = [];
  private filterYear: number = 2017;
  private filterMonth: number = 1;
  query: QueryInformation = new QueryInformation(0, 0, 0, null, '1999', null, 'today');

  constructor(private service: TransactionService ) {
    this.service.filteredTransactionChange.subscribe((tr: Transaction[]) => {
      this.transactions = tr;
    });
  }

  ngOnInit() {
    this.updateView();
  }

  updateView(): void {
    var start = new Date(Date.UTC(this.filterYear, this.filterMonth, 1));
    var end = new Date(Date.UTC(this.filterYear, this.filterMonth + 1, 0, 24, 0, -1));
    var query: QueryInformation = new QueryInformation(0, 0,
      0, start, null, end, null);
    this.service.getFilteredTransactions(query);
  }
}



