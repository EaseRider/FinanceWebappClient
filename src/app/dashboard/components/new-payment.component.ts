import {Component, OnInit} from '@angular/core';
//import {AccountInfo} from "../models/account-info";
import {NgForm} from "@angular/forms";
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../models/transaction";
import {AccountInfo} from "../../auth/models/account-info";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: 'new-payment.component.html'
})
export class NewPaymentComponent implements OnInit {

  private accInfo: AccountInfo;
  private transaction: Transaction;
  private showForm: boolean = true;
  private hasError: boolean = false;
  private lastTransaction: Transaction;

  private test: any = {bla: 'wurst'};

  constructor(private service: TransactionService, private authServ: AuthService) {
  }

  ngOnInit() {
    this.authServ.accountInfoChanged.subscribe(
      (acc: AccountInfo) => {
        this.accInfo = acc;
        this.transaction.total = acc.amount;
      }
    );
    this.authServ.updateAccountInfo();
    this.service.transferChangeEvent.subscribe(
      (res: Transaction) => {
        if (res) {
          this.lastTransaction = res;
          this.service.updateLatestTransactions();
          this.transaction.total = res.total;
          this.transaction.target = '';
          this.transaction.amount = null;
        } else {
          this.lastTransaction = null;
        }
      }
    );
    this.transaction = new Transaction('', '', null, null, new Date());
  }

  public doPayment(f: NgForm): boolean {
    if (f.valid) {
      this.service.createTransfer(this.transaction);
    }
    f.resetForm();
    return false;
  }


}
