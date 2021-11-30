import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BelvoService } from '@app/http/belvo.service';
import { BelvoWidgetService } from '@app/services/belvo-widget.service';
import { ToastService } from '@app/services/toast.service';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-belvo-connection',
  templateUrl: './belvo-connection.component.html',
  styleUrls: ['./belvo-connection.component.scss']
})
export class BelvoConnectionComponent implements OnInit, AfterViewInit {


  constructor(
    private winRef: WindowRef,
    private service: BelvoService,
    private widget: BelvoWidgetService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = window.location.href.split('/');
    const username = params[params.length - 1];
    this.service.username = username;
  }

  public init() {
    console.log(`initializing component`);
    this.service.getSdk(this.winRef)
    .pipe(
      switchMap(sdk => this.widget.create(sdk)),
    ).subscribe(() => {
      this.router.navigate(['/success']);
    }, err => {
      this.toast.show('Falha ao inicializar!', 'danger');
      console.error(err);
    });
    // this.service.getSdk(this.winRef).subscribe(sdk => {
    //   this.sdk = sdk;
    //   this.widget.create(this.sdk, this.username);
    // }, () => {
    // });
  }

  async ngAfterViewInit() {
    this.toast.showSnack('Preparando ambiente...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.toast.hideSnack();
    this.init();
  }

}

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({ providedIn: 'root' })
export class WindowRef {
  get nativeWindow(): any {
    return _window();
  }

}
