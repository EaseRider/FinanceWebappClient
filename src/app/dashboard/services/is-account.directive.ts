import {Directive, OnChanges, Input, SimpleChanges, HostListener, ElementRef} from '@angular/core';
import {Validator, Validators, AbstractControl, NG_VALIDATORS, ValidatorFn, NG_ASYNC_VALIDATORS} from "@angular/forms";
import {TransactionService} from "./transaction.service";
import {Observable} from "rxjs";

@Directive({
  selector: '[isAccount]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: IsAccountDirective, multi: true}]
})
export class IsAccountDirective implements Validator {
  @Input('isAccount') accInfo: any;
  private valFn = Validators.nullValidator;

  constructor(private el: ElementRef, private trSrvc: TransactionService) {
  }

  validate(c: AbstractControl): Observable<{[key: string]: any}> {
    this.accInfo.account = null;
    return this.trSrvc.validateAccountNumber(c.value, this.accInfo).first();
  }
}
