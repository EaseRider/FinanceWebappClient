import {Directive, OnChanges, Input, SimpleChanges, HostListener, ElementRef} from '@angular/core';
import {Validator, Validators, AbstractControl, NG_VALIDATORS, ValidatorFn, NG_ASYNC_VALIDATORS} from "@angular/forms";
import {Observable} from "rxjs";

@Directive({
  selector: '[CheckEqualsInput]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualsToDirective, multi: true}]
})
export class EqualsToDirective implements Validator, OnChanges  {
  @Input('CheckEqualsInput') expected: string;
  private valFn = Validators.nullValidator;

  constructor(private el: ElementRef) {
    console.log('EqualsDirectiv eCOnstruct', el, this.expected)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Validating OnChange:', this.expected, changes);

    const change = changes['equalsInput'];
    if (change) {

    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    console.log('Validating Equals:', this.expected, this.expected == c.value);
    if (this.expected && this.expected == c.value) {
      return null;
    }
    return {'CheckEqualsInput': false};
  }
}
