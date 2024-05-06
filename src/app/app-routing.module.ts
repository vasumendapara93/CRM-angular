import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFound404Component } from './not-found404/not-found404.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProfileComponent } from './profile/profile.component';
import { LeadsComponent } from './leads/leads.component';
import { UserResolveService } from './services/user-resolve.service';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      authOnly: true,
    },
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolveService
    },
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'leads',
        component: LeadsComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'organizations',
        component: OrganizationsComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        resolve: {
          user: UserResolveService
        },
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: '',
    component: NotFound404Component
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
