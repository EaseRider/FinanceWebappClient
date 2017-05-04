import {Directive, Attribute} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';
@Directive({
  selector: '[isEqual][formControl],[isEqual][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualsToDirective, multi: true}]
})
export class EqualsToDirective implements Validator {
  constructor(@Attribute('isEqual') public isEqual: string) {
  }

  validate(control: AbstractControl): { [key: string]: any } {
    var other = control.root.get(this.isEqual);
    if (other && control.value !== other.value) {
      return {
        isEqual: false
      }
    }

    if (other && control.value === other.value) {
      delete control.errors['isEqual'];
    }

    return null;
  }
}
