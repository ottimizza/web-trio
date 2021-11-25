import { AfterViewInit, Component, Injectable } from '@angular/core';
import { RxEvent } from '@app/services/rx-event.service';
import { UpdateService } from '@app/services/update.service';
import { environment } from '@env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public updateAvailable = false;

  constructor(
    private events: RxEvent,
    private updateService: UpdateService
  ) {
    this.updateService.checkForUpdates();
    this.events.subscribe('sw::update', () => {
      this.updateAvailable = true;
    });
  }

}
