import { FormControl } from '@angular/forms';

export function brazilianDateValidator(control: FormControl) {
  const [day, month, year] = control.value.split('/');
  const validate = new Date(`${month}/${day}/${year}`);
  return validate.toString() === 'Invalid Date' ?
    { message: 'Invalid date format. Expected: dd/mm/yyyy. Received: ' + control.value, } :
    null;
}
