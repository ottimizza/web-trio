import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '@app/core.module';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarLayoutComponent } from './layout/navbar-layout/navbar-layout.component';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { BrandModule } from '@shared/components/brand/brand.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorInterceptor, ErrorInterceptorProvider } from '@app/interceptor/http.interceptor';
import { NavbarLayoutModule } from './layout/navbar-layout/navbar-layout.module';
import { DragDropDirective } from '@shared/directives/drag-drop.directive';
import { DocPipe } from '@shared/pipes/doc.pipe';
import { PipesModule } from '@shared/pipes/pipes.module';
import { SigninAsDialogModule } from '@modules/organizations/dialogs/signin-as-dialog/signin-as-dialog.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SigninAsDialogComponent } from '@modules/organizations/dialogs/signin-as-dialog/signin-as-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    SidebarLayoutComponent
    // NavbarLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,

    HttpClientModule,

    // core & shared
    CoreModule,
    // SharedModule,

    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    PipesModule,

    //
    NavbarLayoutModule,

    // Global Components
    AvatarModule,
    BrandModule,
    BreadcrumbModule,

    SigninAsDialogModule,
    MatDialogModule


  ],
  providers: [
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [SigninAsDialogComponent]
})
export class AppModule { }
