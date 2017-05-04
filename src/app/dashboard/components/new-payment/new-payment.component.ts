import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {AccountService} from '../../services/account.service';
import {AccountModel} from '../../models/account.model';
import {TransactionModel} from '../../models/transaction.model';
import {TransactionResource} from '../../resources/transaction.resource';
import {AccountResource} from '../../resources/account.resource';


@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss']
})


export class NewPaymentComponent implements OnInit {
  targetAccountNr: any;
  targetAccount: AccountModel;
  transferAmount: any;


  private account: AccountModel = AccountModel.fromDto({accountNr: '0', amount: 0});

  private messages = {
    payment: null,
    receiver: null,
    amount: null
  };

  constructor(private transactionService: TransactionService, private accountService: AccountService,
              private transactionResource: TransactionResource, private accountResource: AccountResource) {
  }

  ngOnInit() {
    this.accountService.accountChange.subscribe((target) => {
      this.account = target.toDto();
    });
    this.accountService.targetAccountChange.subscribe((target) => {
      this.targetAccount = target.toDto();
    });
    this.accountService.targetAccountMessageChange.subscribe((target) => {
      this.messages.receiver = target;
    });
    this.transactionService.transactionMessageChange.subscribe((target) => {
      this.messages.payment = target;
    });
    this.transactionService.transactionSuccessful.subscribe((target) => {
      this.initializeMessages();
      this.initializeForm();
    });
    this.updateAccountData();
    this.initializeMessages();
  }

  initializeForm() {
    this.targetAccountNr = '';
    this.transferAmount = '';
  }

  initializeMessages() {
    this.messages.amount = 'Please specify an amount.';
    this.messages.receiver = 'Please specify a target account number.';
  }

  onHandlePayment() {
    this.transactionService.createTransfer(TransactionModel.fromDto({
      amount: parseFloat(this.transferAmount).toFixed(2),
      target: this.targetAccountNr
    }));
  }

  onHandleTarget(target) {
    this.accountService.checkAccountNr(target);
  }

  updateAccountData() {
    this.accountService.updateAccount();
  }

}
