import { FormControl } from '@angular/forms';

export function olderDateValidator(info: { dateGenerator?: (date: any) => Date, olderThan: Date }) {
  return function(control: FormControl) {
    const value = control.value;
    const date = info.dateGenerator ? info.dateGenerator(value) : new Date(value);

    if (date.getTime() < info.olderThan.getTime()) {
      return null;
    }
    return { validator: 'olderDate', referenceDate: info.olderThan, receivedDate: date };
  };
}
