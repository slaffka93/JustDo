import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StartPageComponent } from './start-page/start-page.component';
import { HasAccountComponent } from './has-account/has-account.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { TextBlockHeader } from './text-block-header/text-block-header.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    StartPageComponent,
    TermsConditionsComponent,
    TextBlockHeader,
    PrivacyPolicyComponent,
    HasAccountComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: SignInComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'terms', component: TermsConditionsComponent },
      { path: 'privacy', component: PrivacyPolicyComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
