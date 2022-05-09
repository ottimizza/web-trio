import { AfterViewInit, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TrioService } from '@app/http/trio.service';
import { TrioWidgetService } from '@app/services/trio-widget.service';
import { switchMap } from 'rxjs/operators';

@Component({
    template: `<div></div>`
})
export class TrioConnectionComponent implements AfterViewInit {

  constructor(
    private widgetService: TrioWidgetService,
    private trioService: TrioService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngAfterViewInit(): void {
    const params = window.location.href.split('/');
    this.trioService.username = params[params.length - 1];
    this.trioService.requestAccessToken()
    .pipe(switchMap(bridgeToken => this.widgetService.createWidget(bridgeToken.bridge_token)))
    .subscribe({
      next: data => this.next(data),
      // complete: () => this.navigate('sucesso'),
      error: () => this.navigate('cancelar')
    });
  }

  navigate(route: string) {
    this.zone.run(() => {
      this.router.navigate(['' + route]);
    });
  }

  public next(data: any) {
    this.zone.run(() => {
      if (data?.event === 'success') {
        this.trioService.widgetSuccessCalback(data.data).subscribe(() => this.navigate('success'));
      }
    });
  }
}
