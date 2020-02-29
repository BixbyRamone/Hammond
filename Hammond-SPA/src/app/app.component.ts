import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  // onActivate(event) {
  //   const scrollToTop = window.setInterval(() => {
  //       const pos = window.pageYOffset;
  //       if (pos > 0) {
  //           window.scrollTo(0, pos - 20); // how far to scroll on each step
  //       } else {
  //           window.clearInterval(scrollToTop);
  //       }
  //   }, 16);
  // }

  onActivate(event) {
    window.scroll(0, 0);
    // or document.body.scrollTop = 0;
    // or document.querySelector('body').scrollTo(0,0)
}

}
