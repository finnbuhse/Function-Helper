import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { firebaseConfig } from './firebaseConfig';

import { AppComponent } from './app.component';
import { CentreComponent } from './components/centre/centre.component';
import { SignInComponent } from './components/sign-in/signIn.component';
import { SignUpComponent } from './components/sign-up/signUp.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgotPassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyEmailComponent } from './components/verify-email/verifyEmail.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HelpComponent } from './components/help/help.component';
import { AccountComponent } from './components/account/account.component';

import { GraphComponent } from './components/graph/graph.component';
import { FunctionInputComponent } from './components/function-input/functionInput.component';
import { DataInputComponent } from './components/data-input/dataInput.component';
import { FunctionInteractorComponent } from './components/function-interactor/functionInteractor.component';

//import { APP_BASE_HREF } from '@angular/common';
import { FirebaseService } from './shared/firebase/firebase.auth.service';

@NgModule({
  declarations: [
    AppComponent,
    CentreComponent,
    ToolbarComponent,

    // Pages
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    VerifyEmailComponent,
    HelpComponent,
    AccountComponent,

    // Function Helper
    GraphComponent,
    FunctionInputComponent,
    DataInputComponent,
    FunctionInteractorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    //{ provide: APP_BASE_HREF, useValue: '/' },
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
