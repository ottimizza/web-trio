import { Injectable } from '@angular/core';
import { BelvoService } from '@app/http/belvo.service';
import { environment } from '@env';
import { interval, Subject, throwError } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BelvoWidgetService {

  constructor(
    private belvo: BelvoService
  ) {}

  public create(sdk: any) {
    const success$ = new Subject<string>();

    console.log(`[widget] creating belvo widget...`);

    console.log(`[widget] [callback] defining success callback`);
    const successCallbackFunction = ((link: any, institution: any) => {
      console.log(`[widget] [callback] [success] - link=[${link}] institution=[${institution}]`);
      this.belvo.widgetSuccessCalback(link, institution).subscribe(response => {
        console.log('success callback', response);
        success$.next('Widget created successfully');
      });
    });

    // TODO: study a way to use tihs callbacks maybe storing then in the database, at least the error ones.
    console.log(`[widget] [callback] defining exit callback`);
    const onExitCallbackFunction = ((data: any) => {
      console.log('[widget] [callback] [exit]', data);
    });

    // TODO: better understand the usage of event callbacks.
    console.log(`[widget] [callback] defining event callback`);
    const onEventCallbackFunction = ((data: any) => {
      console.log('[widget] [callback] [event]', data);
      if (data.eventName === 'ERROR') {
        success$.error(data);
      }
    });

    const config: any = {
      callback: (link: any, institution: any) => successCallbackFunction(link, institution),
      onExit: (data: any) => onExitCallbackFunction(data),
      onEvent: (data: any) => onEventCallbackFunction(data),
      show_intro: true,
      locale: 'pt',
      country_codes: ['BR'],
      institution_types: ['business'],
      institutions: environment.allowedInstitutions
    };

    console.log('[widget] [token] requesting access_token');
    this.belvo.requestAccessToken().subscribe(response => {
        console.log(`[widget] [token] finished - access_token=[${response.access}]`);
        sdk.createWidget(response.access, config).build();
        console.log(`[widget] widget created successfully`);
    }, err => success$.error(err));

    return success$;
  }

  public getSdk(winRef: any) {
    if (!winRef?.nativeWindow) {
      return throwError('Could not load BelvoSDK');
    }
    return interval(200)
    .pipe(
      map(() => winRef?.nativeWindow?.belvoSDK),
      filter(result => !!result?.createWidget),
      take(1)
    );
  }

  public requestWidget(winRef: any) {
    return this.getSdk(winRef)
    .pipe(switchMap(sdk => this.create(sdk)));
  }

}
