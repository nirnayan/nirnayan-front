import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null; // Return null if controls are not present
    }

    if (matchingControl.errors && !matchingControl.errors['confirmPasswordValidator']) {
      return null; // Return null if the matchingControl already has errors
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null; // Return null if validation passes
  };
}
