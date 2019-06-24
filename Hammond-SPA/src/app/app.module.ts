import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule, TabsModule, PaginationModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { StudentTabComponent } from './admin/student-tab/student-tab.component';
import { EventsTabComponent } from './admin/events-tab/events-tab.component';
import { StudentRegistrationComponent } from './admin/registrations/student-registration/student-registration.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      AdminLandingComponent,
      EventsTabComponent,
      ValueComponent,
      HomeComponent,
      MentorLandingComponent,
      SigninComponent,
      StudentLandingComponent,
      StudentListComponent,
      StudentRegistrationComponent,
      StudentTabComponent,
      NavComponent,
      UserItemComponent
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      FormsModule,
      HttpClientModule,
      PaginationModule.forRoot(),
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      TabsModule.forRoot(),
   ],
   providers: [
      AlertifyService,
      AuthService,
      UserDetailResolver,
      UserListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
