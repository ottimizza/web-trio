import { Component, OnInit } from '@angular/core';
import { BelvoService } from '@app/http/belvo.service';

@Component({
  selector: 'app-success-callback',
  templateUrl: './success-callback.component.html',
  styleUrls: ['./success-callback.component.scss']
})
export class SuccessCallbackComponent implements OnInit {

  constructor(
    private service: BelvoService
  ) { }

  public hasUsername = false;

  ngOnInit(): void {
    this.hasUsername = !!this.service.username;
  }

  public new() {
    const url = `${window.location.origin}/${this.service.username}`;
    window.location.href = url;
  }

}
