import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LeadsComponent } from './leads/leads.component';
<<<<<<< Updated upstream
import { SharedModule } from './shared/shared.module';
<<<<<<< HEAD
import { OrganizationsComponent } from './organizations/organizations.component';
=======
=======
import { ProfileModule } from './profile/profile.module';
>>>>>>> Stashed changes
>>>>>>> bfee65528a83ebda3cc402340f00db3477ce33b3

@NgModule({
  declarations: [
    AppComponent,
    SideNavMenuComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    NotFound404Component,
    ForgotpasswordComponent,
    LoginModalComponent,
    LeadsComponent,
    OrganizationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
<<<<<<< Updated upstream
    SharedModule
=======
    ProfileModule
>>>>>>> Stashed changes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
