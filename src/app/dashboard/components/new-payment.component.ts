import { Component, OnInit } from '@angular/core';
import {AccountInfo} from "../models/account-info";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-payment',
  templateUrl: 'new-payment.component.html'
})
export class NewPaymentComponent implements OnInit {

  private accInfo: AccountInfo;
  constructor() { }

  ngOnInit() {
  }

  public doPayment(f: NgForm):boolean {
    console.log("Making Payment", f);
    if (f.valid) {

    }
    return false;
  }

}
