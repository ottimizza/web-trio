import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GenericInputComponent } from '../generic-input/generic-input-component';

@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.scss']
})
export class DataInputComponent extends GenericInputComponent<string> implements OnInit, OnChanges {

  @Input()
  public placeholder = '';

  @Input()
  public editable = true;

  @Input()
  public type: 'text' | 'date' = 'text';

  @Output()
  public input = new EventEmitter<FormControl>();

  public isEditing = false;
  public isWrong = false;
  public backup: string;

  public edit() {
    this.backup = this.control.value;
    this.isEditing = true;
    this.control.enable();
  }

  public close() {
    this.control.setValue(this.backup);
    this.clean();
  }

  public onInput() {
    this.input.emit(this.control);
  }

  public save() {
    if (this.control.valid) {
      this.clean();
      this.submit.emit(this.control.value);
    } else {
      this.isWrong = true;
    }
  }

  public clean() {
    this.isWrong = false;
    this.isEditing = false;
    this.control.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty(key) && key === 'initialValue') {
        this.control.setValue(this.initialValue);
      }
    }
  }

  ngOnInit(): void {
    this.control.setValue(this.initialValue || '');
    this.control.disable();
  }

}
