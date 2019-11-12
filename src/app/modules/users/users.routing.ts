import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './page/user-list/user-list.component';
import { UserDetailsComponent } from './page/user-details/user-details.component';

// import { ProjectResolver } from './project-resolver.service';
// import { HomeComponent } from './page/home.component';
// import { ProjectDetailsComponent } from './page/project-details/project-details.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   children: [

  //   ],
  // },
  {
    path: '',
    component: UserListComponent
  },
  {
    path: ':id',
    data: {
      breadcrumb: null, path: '/dashboard/users'
    },
    component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
