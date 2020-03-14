import { AuthGuard } from './_guards/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { AdminLandingComponent } from './landingpages/admin-landing/admin-landing.component';
import { MentorLandingComponent } from './landingpages/mentor-landing/mentor-landing.component';
import { StudentLandingComponent } from './landingpages/student-landing/student-landing.component';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { StudentRegistrationComponent } from './admin/registrations/student-registration/student-registration.component';
import { StudProfileResolver } from './_resolvers/stud-profile.resolver';
import { StudAssignmentDetailComponent } from './student/stud-assignment-detail/stud-assignment-detail.component';
// import { MentorStudListComponent } from './mentor/mentor-stud-list/mentor-stud-list.component';
import { GroupRegistrationComponent } from './admin/registrations/group-registration/group-registration.component';
import { UserGroupListResolver } from './_resolvers/user-group-list.resolver';
import { AssignmentListResolver } from './_resolvers/assignment-list.resolver';
import { StudentListResolver } from './_resolvers/student-list.resolver';
import { AssignmentListComponent } from './admin/assignment-list/assignment-list.component';
import { VolunteerListResolver } from './_resolvers/volunteer-list.resolver';
import { MentorStudListComponent } from './mentor/mentor-stud-list/mentor-stud-list.component';
import { GroupsListComponent } from './admin/groups-list/groups-list.component';
import { UserUngroupedResolver } from './_resolvers/user-ungrouped.resolver';
import { UserMyGroupResolver } from './_resolvers/user-my-group.resolver';
import { MentorMyStudentsComponent } from './mentor/mentor-my-students/mentor-my-students.component';
import { GroupResolver } from './_resolvers/group.resolver';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { EventListResolver } from './_resolvers/event-list.resolver';
import { EventsListComponent } from './admin/events-list/events-list.component';
import { AssignmentDetailComponent } from './assignments/assignment-item/assignment-detail/assignment-detail.component';
import { AssignmentDetailResolver } from './_resolvers/assignment-detail.resolver';
import { AssignmentMessageResolver } from './_resolvers/assignment-message.resolver';
import { AssignmentEditComponent } from './admin/assignment-edit/assignment-edit.component';
import { EventEditComponent } from './admin/events-tab/event-edit/event-edit.component';
import { EventViewResolver } from './_resolvers/event-view.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            // Admin Pages
            { path: 'admin', component: AdminLandingComponent,
                resolve: {messages: MessagesResolver}, data: {roles: ['Admin'], operatingRole: 'Admin'} },

            { path: 'admin/students', component: StudentListComponent,
                resolve: {users: StudentListResolver}, data: {roles: ['Admin'], userType: 'Student', operatingRole: 'Admin'} },

            { path: 'admin/events', component: EventsListComponent,
                resolve: {evnts: EventListResolver}, data: {roles: ['Admin'], operatingRole: 'Admin'} },

            { path: 'admin/events/:id', component: EventEditComponent,
                resolve: {evnt: EventViewResolver}, data: {roles: ['Admin'], operatingRole: 'Admin'} },

            { path: 'admin/assignments', component: AssignmentListComponent,
                resolve: {assignments: AssignmentListResolver}, data: {roles: ['Admin'], operatingRole: 'Admin'} },

            { path: 'admin/volunteers', component: StudentListComponent,
                resolve: {users: VolunteerListResolver}, data: {roles: ['Admin'], userType: 'Volunteer', operatingRole: 'Admin'} },

            { path: 'admin/groups', component: GroupsListComponent,
                resolve: {groups: UserGroupListResolver}, data: {roles: ['Admin'], operatingRole: 'Admin'} },

            { path: 'admin/groups/register', component: GroupRegistrationComponent,
                resolve: {users: UserUngroupedResolver}, data: {roles: ['Admin'], operatingRole: 'Admin'} },

            { path: 'admin/registerstudent',  component: StudentRegistrationComponent,
                data: {roles: ['Admin'], operatingRole: 'Admin'} },

            { path: 'admin/users/:id', component: UserProfileComponent, resolve: { user: UserDetailResolver },
                data: { operatingRole: 'Admin' } },

            { path: 'admin/assignment/:id', component: AssignmentEditComponent,
                resolve: { assignment: AssignmentDetailResolver, messages: AssignmentMessageResolver, user: UserDetailResolver },
                data: { operatingRole: 'Admin' } },
            // ===============

            // Mentor Pages
            { path: 'mentor', component: MentorLandingComponent,
                resolve: { assignments: AssignmentListResolver, group: GroupResolver, messages: MessagesResolver,
                    events: EventListResolver },
                data: {roles: ['Admin', 'Mentor']} },

            { path: 'mentor/students', component: MentorStudListComponent,
                resolve: {users: StudentListResolver}, data: {roles: ['Admin', 'Mentor'], operatingRole: 'Mentor'} },

            { path: 'mentor/mygroup', component: MentorMyStudentsComponent,
                resolve: {group: UserMyGroupResolver}, data: {roles: ['Admin', 'Mentor'], operatingRole: 'Mentor'} },

            { path: 'mentor/assignments', component: AssignmentListComponent,
                resolve: {assignments: AssignmentListResolver}, data: {roles: ['Mentor'], operatingRole: 'Mentor'} },

            { path: 'mentor/assignment/:id', component: AssignmentDetailComponent,
                resolve: { assignment: AssignmentDetailResolver, messages: AssignmentMessageResolver, user: UserDetailResolver },
                data: { operatingRole: 'Mentor' } },
            // =================

            { path: 'student', component: StudentLandingComponent,
                resolve: {user: StudProfileResolver, group: GroupResolver, messages: MessagesResolver },
                 data: {roles: ['Admin', 'Mentor', 'Student'], operatingRole: 'Admin'} },

            { path: 'student/:id/assignment/:assId', component: AssignmentDetailComponent,
                resolve: { assignment: AssignmentDetailResolver, messages: AssignmentMessageResolver, user: UserDetailResolver } },

            { path: 'users/:id', component: UserProfileComponent, resolve: { user: UserDetailResolver } },

            { path: 'mentor/assignments/:id', component: AssignmentDetailComponent,
                resolve: { assignment: AssignmentDetailResolver, messages: AssignmentMessageResolver } },

            { path: 'assignment/:id', component: AssignmentDetailComponent,
                resolve: { assignment: AssignmentDetailResolver }}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
