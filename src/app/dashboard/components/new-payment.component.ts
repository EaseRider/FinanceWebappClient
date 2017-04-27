import {Component, OnInit, ViewChild, Input} from '@angular/core';
//import {AccountInfo} from "../models/account-info";
import {NgForm, FormControl} from "@angular/forms";
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../models/transaction";
import {AccountInfo} from "../../auth/models/account-info";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: 'new-payment.component.html'
})
export class NewPaymentComponent implements OnInit {

  @Input() testvalue: any;

  private newPayForm: NgForm;
  @ViewChild('newPayForm') currentForm: NgForm;
  private accInfo: AccountInfo;
  private transaction: Transaction;
  private showForm: boolean = true;
  private hasError: boolean = false;
  private lastTransaction: Transaction;
  private toForm: FormControl;

  private selectedAccInfo: any = {account: null};

  formErrors = {
    'to': '',
    'amount': ''
  };
  validationMessages = {
    'to': {
      'required': 'To-Account is required.',
      'minlength': 'To-Account must be exactly 7 characters long.',
      'maxlength': ' To-Account must be exactly 7 characters long.',
      'pattern': 'Only numbers are accepted',
    },
    'amount': {
      'required': 'Amount is required.',
      'pattern': 'Amount must be above 0.05 CHF.'
    }
  };

  constructor(private service: TransactionService, private authServ: AuthService) {

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  /**
   * Basic Directive Validation: https://angular.io/docs/ts/latest/cookbook/form-validation.html#!#custom-validation-directive
   * Extended with Async: https://netbasal.com/angular-2-forms-create-async-validator-directive-dd3fd026cb45
   *
   * Check FormGroup
   */
  formChanged() {
    if (this.currentForm === this.newPayForm) {
      return;
    }
    this.newPayForm = this.currentForm;
    if (this.newPayForm) {
      this.newPayForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    console.log("Testavalue", this.testvalue);
    if (!this.newPayForm) {
      return;
    }
    const form = this.newPayForm.form;
    this.toForm = <FormControl>form.get('to');
    if (!this.toForm.valid) {
      this.selectedAccInfo.account = null;
    }

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (messages[key])
            this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
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
      f.resetForm();
    }
    return false;
  }


}
