import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { interval, Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TrioWidgetService {

  private api: any;

  constructor(
    @Inject(DOCUMENT) public doc: Document
  ) {}

  public checkInitiation() {
    if (this.started) {
      return of(true);
    }
    return interval(100)
    .pipe(
      filter(() => {
        // A variável Trio é uma variável estática
        // @ts-ignore:next-line
        const trioApi = Trio;
        if (trioApi) {
          this.api = trioApi;
          return true;
        }
        return false;
      }),
      map(() => true),
      take(1)
    );
  }

  public createWidget(bridgeToken: string) {
    return this.checkInitiation()
    .pipe(switchMap(() => this._createWidget(bridgeToken)));
  }

  private _createWidget(bridgeToken: string) {
    return new Observable<{ event: string, data: any }>(sub => {

      this.api.create({
        bridgeToken,
        clientId: environment.trioClientId,
        environment: environment.production ? 'production' : 'sandbox',
        onLoad: () => sub.next({ event: 'load', data: null }),
        onEvent: (eventType: any, data: any) => sub.next({ event: 'event', data: { eventType, data } }),
        onSuccess: (data: any) => {
          sub.next({ event: 'success', data });
          sub.complete();
        },
        onExit: () => sub.error({ event: 'exit', data: null })
      });
      this.api.open();

    });
  }

  public get started() {
    return !!this.api;
  }

}
