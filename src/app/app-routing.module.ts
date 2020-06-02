import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { AuthGuard } from '@app/guard/auth.guard';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { ManageGuard } from '@app/guard/manage.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    data: {
      breadcrumb: 'Dashboard'
    },
    component: ContentLayoutComponent,
    canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        data: {
          breadcrumb: 'Aplicativos'
        },
        loadChildren: () => import('@modules/products/products.module').then(m => m.ProductsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        data: {
          breadcrumb: 'Usuários'
        },
        loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'organizations',
        data: {
          breadcrumb: 'Empresas'
        },
        loadChildren: () => import('@modules/organizations/organizations.module').then(m => m.OrganizationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'permissions',
        data: {
          breadcrumb: 'Permissões'
        },
        loadChildren: () => import('@modules/permissions/permissions.module').then(m => m.PermissionsModule),
        canActivate: [AuthGuard, ManageGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
