import { Component, OnInit } from '@angular/core';
import {Transaction} from "../models/transaction";
import {ConsolePipe} from "../../shared/console.pipe";

@Component({
  selector: 'app-all-transactions',
  templateUrl: 'all-transactions.component.html'
})
export class AllTransactionsComponent implements OnInit {
  private transactions: Transaction[] = [];
  constructor() { }

  ngOnInit() {
  }

}



