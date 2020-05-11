import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  roles: any = null;
  role: any = null;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    if (!this.authService.loggedIn()) {
      this.logout();
    }
    }

  loggedIn() {
    this.getRoles();
    console.log(this.authService.loggedIn());
    return this.authService.loggedIn();
  }

  logout() {
    this.role = null;
    this.roles = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  getRoles() {
    if (this.authService.decodedToken) {
      this.roles = this.authService.decodedToken.role;
    if ((typeof this.roles) === 'string') {
      this.role = this.roles;
      this.roles = null;
    }
    }
  }

}
