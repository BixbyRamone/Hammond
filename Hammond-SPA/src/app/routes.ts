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
import { MentorStudListComponent } from './mentor/mentor-stud-list/mentor-stud-list.component';
import { GroupRegistrationComponent } from './admin/registrations/group-registration/group-registration.component';
import { UserGroupListResolver } from './_resolvers/user-group-list.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'values', component: ValueComponent},

            { path: 'admin', component: AdminLandingComponent,
                resolve: {users: UserListResolver}, data: {roles: ['Admin']} },

            { path: 'admin/students', component: StudentListComponent,
                /*resolve: {users: UserListResolver},*/ data: {roles: ['Admin']} },

            { path: 'admin/groups', component: GroupRegistrationComponent,
                /*resolve: {users: UserGroupListResolver},*/ data: {roles: ['Admin']} },

            { path: 'admin/registerstudent',  component: StudentRegistrationComponent,
                data: {roles: ['Admin']} },

            { path: 'mentor', component: MentorLandingComponent,
                resolve: {users: UserListResolver}, data: {roles: ['Admin', 'Mentor']} },

            { path: 'student', component: StudentLandingComponent, resolve: {user: StudProfileResolver},
                 data: {roles: ['Admin', 'Mentor', 'Student']} },

            { path: 'student/assignments/:id', component: StudAssignmentDetailComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
