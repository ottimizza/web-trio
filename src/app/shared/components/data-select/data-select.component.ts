import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { GenericInputComponent } from '../generic-input/generic-input-component';

export class DataSelectOption {
  value: any;
  displayed: string;
}

@Component({
  selector: 'app-data-select',
  templateUrl: './data-select.component.html',
  styleUrls: ['./data-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataSelectComponent extends GenericInputComponent<any> implements OnInit, OnChanges {

  @Input()
  public options: DataSelectOption[] = [];

  @ViewChild('select', { static: true })
  public matSelect: MatSelect;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty(key) && key === 'initialValue') {
        this.control.setValue(this.initialValue);
      }
    }
  }

  public selectOption(event: MatSelectChange) {
    this.control.disable();
    this.submit.emit(event.value);
  }

  public openSelect() {
    if (this.options?.length) {
      this.control.enable();
      this.matSelect.open();
    } else {
      throw new Error('It is not possible to open a DataSelectComponent that does not have options');
    }
  }

  ngOnInit(): void {
    this.control.setValue(this.initialValue || '');
    this.control.disable();
  }

}
