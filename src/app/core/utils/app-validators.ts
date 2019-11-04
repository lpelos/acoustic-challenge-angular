import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const UUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class AppValidators {

  static get present(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let { value } = control;
      if (typeof value === 'string') { value = value.trim(); }
      return value == null || value === '' ? { present: true } : null;
    };
  }

  static get uuid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      return value == null || UUID_REGEXP.test(value) ? null : { uuid: true };
    };
  }

}
