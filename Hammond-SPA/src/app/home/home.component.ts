import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from '../_models/role';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  roles: any[];

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
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

}
