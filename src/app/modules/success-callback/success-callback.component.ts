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

  public username: string;

  ngOnInit(): void {
    this.username = this.service.username;
  }

  public new() {
    if (this.username) {
      const url = `${window.location.origin}/${this.username}`;
      window.location.href = url;
    }
  }

}
