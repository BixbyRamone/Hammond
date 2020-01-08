import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  alertifyMessage: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
      this.alertifyMessage = 'Are you sure you want to remove ' + this.user.firstName + ' ' +
      this.user.lastName + '\'s profile?';
      // console.dir(this.user.userRoles);
    });
  }

  deleteUser(id: number) {
    this.alertify.confirm(this.alertifyMessage, () => {
      this.userService.deleteUser(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.alertify.success('User has been deleted');
        this.router.navigate(['/admin/students'])
      }, error => {
        this.alertify.error('Failed to delete this user');
      });
    });
  }

}
