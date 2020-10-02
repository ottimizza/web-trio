import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pulsating-spinner',
  templateUrl: './pulsating-spinner.component.html',
  styleUrls: ['./pulsating-spinner.component.scss']
})
export class PulsatingSpinnerComponent {

  @Input()
  public pulse = true;

  constructor() { }

}
