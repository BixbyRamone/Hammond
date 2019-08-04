import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule, TabsModule, PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';
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
import { EventRegistrationComponent } from './admin/registrations/event-registration/event-registration.component';
import { AssignmentTabComponent } from './admin/assignment-tab/assignment-tab.component';
import { VolunteersTabComponent } from './admin/volunteers-tab/volunteers-tab.component';
import { AssigmentRegistrationComponent } from './admin/registrations/assigment-registration/assigment-registration.component';
import { StudentDropboxComponent } from './admin/registrations/student-dropbox/student-dropbox.component';
import { EventsListComponent } from './admin/events-list/events-list.component';
import { AssignmentListComponent } from './admin/assignment-list/assignment-list.component';
import { StudAssignmentTabComponent } from './student/stud-assignment-tab/stud-assignment-tab.component';
import { StudProfileTabComponent } from './student/stud-profile-tab/stud-profile-tab.component';
import { StudProfileResolver } from './_resolvers/stud-profile.resolver';
import { AssignmentItemComponent } from './assignments/assignment-item/assignment-item.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      AssignmentItemComponent,
      AssigmentRegistrationComponent,
      AdminLandingComponent,
      AssignmentListComponent,
      AssignmentTabComponent,
      EventsListComponent,
      EventRegistrationComponent,
      EventsTabComponent,
      ValueComponent,
      HomeComponent,
      MentorLandingComponent,
      SigninComponent,
      StudAssignmentTabComponent,
      StudProfileTabComponent,
      StudentDropboxComponent,
      StudentLandingComponent,
      StudentListComponent,
      StudentRegistrationComponent,
      StudentTabComponent,
      NavComponent,
      UserItemComponent,
      VolunteersTabComponent
   ],
   imports: [
      BrowserModule,
      BsDatepickerModule.forRoot(),
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
      StudProfileResolver,
      UserDetailResolver,
      UserListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
