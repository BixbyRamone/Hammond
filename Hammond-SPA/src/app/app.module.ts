import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule, TabsModule, PaginationModule, BsDatepickerModule, ButtonsModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from 'time-ago-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ModalModule } from 'ngx-bootstrap/modal';

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
import { StudAssignmentDetailComponent } from './student/stud-assignment-detail/stud-assignment-detail.component';
import { VolunteerRegistrationComponent } from './admin/registrations/volunteer-registration/volunteer-registration.component';
import { MentorStudListComponent } from './mentor/mentor-stud-list/mentor-stud-list.component';
import { MentorStudTabComponent } from './mentor/mentor-stud-tab/mentor-stud-tab.component';
import { MentorMyStudentsComponent } from './mentor/mentor-my-students/mentor-my-students.component';
import { GroupsTabComponent } from './admin/groups-tab/groups-tab.component';
import { GroupsListComponent } from './admin/groups-list/groups-list.component';
import { GroupRegistrationComponent } from './admin/registrations/group-registration/group-registration.component';
import { UserGroupListResolver } from './_resolvers/user-group-list.resolver';
import { GroupService } from './_services/group.service';
import { AssignmentService } from './_services/assignment.service';
import { AssignmentListResolver } from './_resolvers/assignment-list.resolver';
import { EventService } from './_services/event.service';
import { StudentListResolver } from './_resolvers/student-list.resolver';
import { VolunteerListResolver } from './_resolvers/volunteer-list.resolver';
import { UserUngroupedResolver } from './_resolvers/user-ungrouped.resolver';
import { UserMyGroupResolver } from './_resolvers/user-my-group.resolver';
import { StudGroupTabComponent } from './student/stud-group-tab/stud-group-tab.component';
import { GroupResolver } from './_resolvers/group.resolver';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MessagesComponent } from './messages/messages.component';
import { UserMessagesComponent } from './users/user-messages/user-messages.component';
import { EventListResolver } from './_resolvers/event-list.resolver';
import { AssignmentItemComponent } from './assignments/assignment-item/assignment-item.component';
import { AssignmentDetailComponent } from './assignments/assignment-item/assignment-detail/assignment-detail.component';
import { AssignmentDetailResolver } from './_resolvers/assignment-detail.resolver';
import { AssignmentMessageResolver } from './_resolvers/assignment-message.resolver';
import { AssignmentEditComponent } from './admin/assignment-edit/assignment-edit.component';
import { EventEditComponent } from './admin/events-tab/event-edit/event-edit.component';
import { EventViewResolver } from './_resolvers/event-view.resolver';
import { SessionsTabComponent } from './admin/sessions-tab/sessions-tab.component';
import { SessionRegistrationComponent } from './admin/registrations/session-registration/session-registration.component';
import { SessionsListComponent } from './admin/sessions-list/sessions-list.component';
import { SessionListResolver } from './_resolvers/session-list.resolver';
import { AssignmentForSessionResolver } from './_resolvers/assignments-for-session.resolver';
import { SessionNextResolver } from './_resolvers/session-next.resolver';
import { UngroupedStudentResolver } from './_resolvers/ungrouped-student.resolver';
import { UngroupedMentorResolver } from './_resolvers/ungroupded-mentor.resolver';
import { UserAssignmentDetailResolver } from './_resolvers/user-assignment-detail.resolver';
import { TestTabsComponent } from './test-tabs/test-tabs.component';
import { VolunteerTabsComponent } from './Tabs/volunteer-tabs/volunteer-tabs.component';
import { StudentTabsComponent } from './Tabs/student-tabs/student-tabs.component';
import { AdminTabsComponent } from './Tabs/admin-tabs/admin-tabs.component';
import { EventItemComponent } from './admin/events-tab/event-item/event-item.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      AssignmentDetailComponent,
      AssignmentEditComponent,
      AssignmentItemComponent,
      AssigmentRegistrationComponent,
      AdminLandingComponent,
      AdminTabsComponent,
      AssignmentListComponent,
      AssignmentTabComponent,
      EventEditComponent,
      EventItemComponent,
      EventsListComponent,
      EventRegistrationComponent,
      EventsTabComponent,
      GroupsListComponent,
      GroupRegistrationComponent,
      GroupsTabComponent,
      ValueComponent,
      HomeComponent,
      MentorLandingComponent,
      MentorMyStudentsComponent,
      MentorStudTabComponent,
      MentorStudListComponent,
      MessagesComponent,
      SessionsListComponent,
      SessionsTabComponent,
      SessionRegistrationComponent,
      SigninComponent,
      StudAssignmentDetailComponent,
      StudAssignmentTabComponent,
      StudGroupTabComponent,
      StudProfileTabComponent,
      StudentDropboxComponent,
      StudentLandingComponent,
      StudentListComponent,
      StudentRegistrationComponent,
      StudentTabComponent,
      StudentTabsComponent,
      TestTabsComponent,
      TimeAgoPipe,
      NavComponent,
      UserItemComponent,
      UserMessagesComponent,
      UserProfileComponent,
      VolunteerRegistrationComponent,
      VolunteerTabsComponent,
      VolunteersTabComponent,
      FileUploaderComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      ButtonsModule.forRoot(),
      FormsModule,
      FileUploadModule,
      HttpClientModule,
      ModalModule.forRoot(),
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
      ModalModule.forRoot(),
   ],
   providers: [
      AlertifyService,
      AssignmentDetailResolver,
      AssignmentForSessionResolver,
      AssignmentMessageResolver,
      AssignmentService,
      AuthService,
      EventService,
      GroupService,
      AssignmentListResolver,
      EventListResolver,
      EventViewResolver,
      GroupResolver,
      MessagesResolver,
      SessionListResolver,
      SessionNextResolver,
      StudentListResolver,
      StudProfileResolver,
      UngroupedMentorResolver,
      UngroupedStudentResolver,
      UserAssignmentDetailResolver,
      UserDetailResolver,
      UserGroupListResolver,
      UserListResolver,
      UserMyGroupResolver,
      UserUngroupedResolver,
      VolunteerListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
