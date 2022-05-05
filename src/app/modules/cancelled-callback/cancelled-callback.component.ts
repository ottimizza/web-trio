import { Component, OnInit } from '@angular/core';
import { TrioService } from '@app/http/trio.service';

@Component({
  selector: 'app-cancelled-callback',
  templateUrl: './cancelled-callback.component.html',
  styleUrls: ['./cancelled-callback.component.scss']
})
export class CancelledCallbackComponent implements OnInit {

  constructor(
    private service: TrioService
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
