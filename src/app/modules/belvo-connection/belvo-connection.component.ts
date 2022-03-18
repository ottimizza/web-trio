import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BelvoWidgetService } from '@app/services/belvo-widget.service';
import { ToastService } from '@app/services/toast.service';
import { BelvoService } from '@app/http/belvo.service';

@Component({
  selector: 'app-belvo-connection',
  templateUrl: './belvo-connection.component.html',
  styleUrls: ['./belvo-connection.component.scss']
})
export class BelvoConnectionComponent implements OnInit {

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

    this.init();
  }

  public init() {
    console.log(`initializing component`);
    this.widget.requestWidget(this.winRef).subscribe(() => {
      this.router.navigate(['/success']);
    }, err => {
      if (err.meta_data.error_code === 'token_required' && err.meta_data.institution_name.toLowerCase().includes('bradesco')) {
        alert('A autorização pelo Bradesco deve ser realizada através de usuário de consulta com permissão de acesso a extratos. Credenciamento com usuário master não será permitido');
        window.location.reload();
      }
      console.error(err);
      this.toast.show('Falha ao inicializar!', 'danger');
    });
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
