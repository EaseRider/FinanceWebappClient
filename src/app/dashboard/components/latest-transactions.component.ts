import { Component, OnInit } from '@angular/core';
import {Transaction} from "../models/transaction";
import {ConsolePipe} from "../../shared/console.pipe";

@Component({
  selector: 'app-latest-transactions',
  templateUrl: 'latest-transactions.component.html'
})
export class LatestTransactionsComponent implements OnInit {
  private transactions: Transaction[] = [];
  constructor() { }

  ngOnInit() {
  }

}



