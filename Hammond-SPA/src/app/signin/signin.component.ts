import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
  }

  alertifyTest() {
    this.alertify.success('success');
    this.alertify.error('error');
    this.alertify.warning('warning');
    this.alertify.message('message');
  }

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in successfully');
      }, error => {
        console.log(error);
        this.alertify.error(error);
      }, () => {
        // switch (this.authService.decodedToken.role) {
        //   case 'Admin':
        //     this.router.navigate(['/admin']);
        //     break;
        //   case 'Student':
        //     this.router.navigate(['/student']);
        //     break;
        // }
        console.log(this.authService.decodedToken);
        if (this.authService.decodedToken.role.includes('Admin')) {
          this.router.navigate(['/admin']);
        }
        if (this.authService.decodedToken.role.includes('Student')) {
          this.router.navigate(['/student']);
        }
        if (this.authService.decodedToken.role.includes('Mentor')) {
          this.router.navigate(['/mentor']);
        }
        if (this.authService.decodedToken.role.includes('Tutor')) {
          this.router.navigate(['/tutor']);
        }
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }


}
