import { Component } from '@angular/core';
// import { OverlayContainer } from '@angular/cdk/overlay';

// import { ThemeService } from '@app/service/theme.service';

export interface SidebarItem {
  icon: string;
  label: string;
  url: string;
  id: string;
  mustShow: boolean;
}

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent {

  // public items: SidebarItem[];
  // public currentUser: User;

  // theme = `${environment.backgroundTheme}`;

  // constructor(@Inject(DOCUMENT) public document: Document, public dialog: MatDialog) { }

  // public hide(e) {
  //   this.document.getElementsByTagName('body')[0].classList.remove('show-sidebar');
  // }

  // ngOnInit() {
  //   this.currentUser = User.fromLocalStorage();
  //   const canManage = TokenInfo.fromLocalStorage().canManage();
  //   const isNotTareffa = environment.applicationId !== 'tareffa';
  //   this.items = [
  //     { id: 'produtos', icon: 'fad fa-box', label: 'Aplicativos', url: '/dashboard/products', mustShow: true },
  //     { id: 'usuarios', icon: 'fad fa-users', label: 'Usuários', url: '/dashboard/users', mustShow: isNotTareffa },
  //     // { id: 'empresas', icon: 'fad fa-industry-alt', label: 'Empresas', url: '/dashboard/organizations', mustShow: isNotTareffa },
  //     { id: 'permissoes', icon: 'fad fa-users-cog', label: 'Permissões', url: '/dashboard/permissions', mustShow: canManage }
  //   ];
  // }

  // public openSiginAsModal() {
  //   const dialogRef = this.dialog.open(SigninAsDialogComponent, {
  //     width: '568px',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //   });
  // }
}
