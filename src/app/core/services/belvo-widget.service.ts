import { Injectable } from '@angular/core';
import { BelvoService } from '@app/http/belvo.service';

@Injectable({ providedIn: 'root' })
export class BelvoWidgetService {

  constructor(
    private belvo: BelvoService
  ) {}

  public async create(sdk: any, username: string): Promise<any> {
    console.log(`[widget] creating belvo widget...`);

    console.log(`[widget] [callback] defining success callback`);
    const successCallbackFunction = ((link: any, institution: any) => {
      console.log(`[widget] [callback] [success] - link=[${link}] institution=[${institution}]`);
      this.belvo.widgetSuccessCalback(link, institution, username).subscribe(response => {
        console.log('success callback', response);
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
    });

    // TODO: this boy here should be getting some attributes from environment variables too.
    // TODO: isolate this variables and the creation of this object on a isolated service.
    const config: any = {
      callback: (link: any, institution: any) => successCallbackFunction(link, institution),
      onExit: (data: any) => onExitCallbackFunction(data),
      onEvent: (data: any) => onEventCallbackFunction(data),
      show_intro: true,
      locale: 'pt',
      country_codes: ['BR'],
      branding: {
        company_logo: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
        company_name: 'Ottimizza',
      }
    };

    console.log('[widget] [token] requesting access_token');
    this.belvo.requestAccessToken().subscribe(response => {
        console.log(`[widget] [token] finished - access_token=[${response.access}]`);
        sdk.createWidget(response.access, config).build();
        console.log(`[widget] widget created successfully`);
    });
  }

}
