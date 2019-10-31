import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static get present(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let { value } = control;
      if (typeof value === 'string') { value = value.trim(); }
      return value == null || value === '' ? { present: true } : null;
    };
  }
}
