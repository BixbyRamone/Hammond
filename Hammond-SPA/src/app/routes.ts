import { AuthGuard } from './_guards/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { AdminLandingComponent } from './landingpages/admin-landing/admin-landing.component';
import { MentorLandingComponent } from './landingpages/mentor-landing/mentor-landing.component';
import { StudentLandingComponent } from './landingpages/student-landing/student-landing.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'values', component: ValueComponent},
            { path: 'admin', component: AdminLandingComponent, data: {roles: ['Admin']} },
            { path: 'mentor-home', component: MentorLandingComponent, data: {roles: ['Admin', 'Mentor']} },
            { path: 'student-home', component: StudentLandingComponent, data: {roles: ['Admin', 'Mentor', 'Student']} }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
