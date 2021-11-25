import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { AuthGuard } from '@app/guard/auth.guard';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { ManageGuard } from '@app/guard/manage.guard';
import { LandPageComponent } from '@modules/land-page/page/land-page.component';
import { BelvoConnectionComponent } from '@modules/belvo-connection/belvo-connection.component';

const routes: Routes = [
  {
    path: ':username',
    component: BelvoConnectionComponent,
    pathMatch: 'full'
  }
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'signup',
  //   data: {
  //     breadcrumb: null
  //   },
  //   children: [
  //     {
  //       path: '',
  //       data: {
  //         breadcrumb: null
  //       },
  //       loadChildren: () => import('@modules/signup/signup.module').then(m => m.SignupModule)
  //     },
  //   ]
  // },
  // {
  //   path: 'landpage',
  //   data: {
  //     breadcrumb: null
  //   },
  //   component: LandPageComponent,
  //   canActivate: [NoAuthGuard]
  // },
  // {
  //   path: 'dashboard',
  //   data: {
  //     breadcrumb: 'Portal'
  //   },
  //   component: ContentLayoutComponent,
  //   canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'products',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'products',
  //       data: {
  //         breadcrumb: 'Aplicativos'
  //       },
  //       loadChildren: () => import('@modules/products/products.module').then(m => m.ProductsModule),
  //       canActivate: [AuthGuard]
  //     },
  //     {
  //       path: 'users',
  //       data: {
  //         breadcrumb: 'Usuários'
  //       },
  //       loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule),
  //       canActivate: [AuthGuard]
  //     },
  //     // {
  //     //   path: 'organizations',
  //     //   data: {
  //     //     breadcrumb: 'Empresas'
  //     //   },
  //     //   loadChildren: () => import('@modules/organizations/organizations.module').then(m => m.OrganizationModule),
  //     //   canActivate: [AuthGuard]
  //     // },
  //     {
  //       path: 'permissions',
  //       data: {
  //         breadcrumb: 'Permissões'
  //       },
  //       loadChildren: () => import('@modules/permissions/permissions.module').then(m => m.PermissionsModule),
  //       canActivate: [AuthGuard, ManageGuard]
  //     }
  //   ]
  // },
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('@modules/auth/auth.module').then(m => m.AuthModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
