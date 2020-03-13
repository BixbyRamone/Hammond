import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  alertifyMessage: string;

  constructor(private alertify: AlertifyService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.alertifyMessage = 'Are you sure you want to remove ' + this.user.firstName + ' ' +
    this.user.lastName + '\'s profile?';
  }

  deleteUser(id: number) {
    this.alertify.confirm(this.alertifyMessage, () => {
      this.userService.deleteUser(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.alertify.success('User has been deleted');
        this.router.navigate(['/admin/students']);
      }, error => {
        console.log(error);
        this.alertify.error('Failed to delete this user');
      });
    });
  }

}
