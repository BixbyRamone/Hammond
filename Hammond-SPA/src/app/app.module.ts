import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { ValueComponent } from './value/value.component';
import { SigninComponent } from './signin/signin.component';
import { NavComponent } from './nav/nav.component';
import { AdminLandingComponent } from './landingpages/admin-landing/admin-landing.component';
import { StudentLandingComponent } from './landingpages/student-landing/student-landing.component';
import { MentorLandingComponent } from './landingpages/mentor-landing/mentor-landing.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      AdminLandingComponent,
      ValueComponent,
      HomeComponent,
      MentorLandingComponent,
      SigninComponent,
      StudentLandingComponent,
      NavComponent
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AlertifyService,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
