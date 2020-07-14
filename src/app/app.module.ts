import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';

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
import { NavbarLayoutModule } from './layout/navbar-layout/navbar-layout.module';
import { DragDropDirective } from '@shared/directives/drag-drop.directive';
import { DocPipe } from '@shared/pipes/doc.pipe';
import { PipesModule } from '@shared/pipes/pipes.module';
import { SigninAsDialogModule } from '@modules/organizations/dialogs/signin-as-dialog/signin-as-dialog.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SigninAsDialogComponent } from '@modules/organizations/dialogs/signin-as-dialog/signin-as-dialog.component';
import { GlobalHttpInterceptorProvider } from '@app/interceptor/http/http-interceptor.provider';

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

    // Firebase Notification
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),

    // Global Components
    AvatarModule,
    BrandModule,
    BreadcrumbModule,

    SigninAsDialogModule,
    MatDialogModule


  ],
  providers: [GlobalHttpInterceptorProvider],
  bootstrap: [AppComponent],
  entryComponents: [SigninAsDialogComponent]
})
export class AppModule { }
