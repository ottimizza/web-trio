import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatDialogModule } from '@angular/material/dialog';

import { GlobalHttpInterceptorProvider } from '@app/interceptor/http/http-interceptor.provider';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { NavbarLayoutModule } from './layout/navbar-layout/navbar-layout.module';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { BrandModule } from '@shared/components/brand/brand.module';
import { environment } from '../environments/environment';
import { PipesModule } from '@shared/pipes/pipes.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@app/core.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
    SidebarLayoutComponent,
    // NavbarLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,

    HttpClientModule,
    MatSnackBarModule,

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
    // AngularFireModule.initializeApp(environment.firebase),

    // Global Components
    AvatarModule,
    BrandModule,
    BreadcrumbModule,

    MatDialogModule


  ],
  providers: [GlobalHttpInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule { }
