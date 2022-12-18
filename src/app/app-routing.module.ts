import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/signIn.component';
import { SignUpComponent } from './components/sign-up/signUp.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgotPassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyEmailComponent } from './components/verify-email/verifyEmail.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in'/*DASHBOARD DEBUG:'dashboard'*/, pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
