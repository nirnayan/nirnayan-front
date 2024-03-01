import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import Validation from '../utils/validation';

@Directive({
  selector: '[appMatchPasswordDirective]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirectiveDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordDirectiveDirective {

  constructor() { }

  @Input('appMatchPassword') matchPassword: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.match(
      this.matchPassword[0],
      this.matchPassword[1]
    )(formGroup);
  }
}
