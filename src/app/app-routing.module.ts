import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/signIn.component';
import { SignUpComponent } from './components/sign-up/signUp.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgotPassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyEmailComponent } from './components/verify-email/verifyEmail.component';
import { HelpComponent } from './components/help/help.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in'/*DASHBOARD DEBUG:'dashboard'*/, pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'help', component: HelpComponent },
  { path: 'account', component: AccountComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
