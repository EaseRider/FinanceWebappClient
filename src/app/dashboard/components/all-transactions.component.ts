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
  private filterYear: number = (new Date()).getFullYear();
  private filterMonth: number = (new Date()).getMonth();

  private years: number[] = [2017, 2016, 2015];
  private months: string[] = ['Jannuary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private service: TransactionService ) {
    this.service.filteredTransactionChange.subscribe((tr: Transaction[]) => {
      this.transactions = tr;
    });
  }

  selectionChange(): void {
    this.filterMonth = parseInt(this.filterMonth.toString());
    this.filterYear = parseInt(this.filterYear.toString());
    this.updateView();
  }
  ngOnInit() {
    this.updateView();
  }

  updateView(): void {
    var start = new Date(Date.UTC(this.filterYear, this.filterMonth, 1));
    var end = new Date(Date.UTC(this.filterYear, (this.filterMonth + 1), 0, 23, 59, 59, 999));
    var query: QueryInformation = new QueryInformation(0, 0,
      0, start, null, end, null);
    this.service.getFilteredTransactions(query);
  }
}



