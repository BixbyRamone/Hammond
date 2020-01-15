import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  alertifyMessage: string;
  nameEditOn = false;
  roleEditOn = false;
  studentRole = [{value: 'student', display: 'Student', checked: false},
                 {value: 'tutor', display: 'Tutor', checked: false},
                 {value: 'mentor', display: 'Mentor', checked: false},
                 {value: 'admin', display: 'Admin', checked: false} ];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertify: AlertifyService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
      this.alertifyMessage = 'Are you sure you want to remove ' + this.user.firstName + ' ' +
      this.user.lastName + '\'s profile?';
      let iterator = 1;
      this.studentRole.forEach(element => {
        element.checked = this.createCheckedState(iterator);
        iterator++;
      });
    });
  }

  createCheckedState(roleId: number) {
    const returnable = this.user.userRoles.filter((opt) => {
      return opt.role.id === roleId;
    })[0];
     if (returnable) {
       return true;
     }
     return false;
  }

  deleteUser(id: number) {
    this.alertify.confirm(this.alertifyMessage, () => {
      this.userService.deleteUser(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.alertify.success('User has been deleted');
        this.router.navigate(['/admin/students']);
      }, error => {
        this.alertify.error('Failed to delete this user');
      });
    });
  }

  updateUser(editForm: NgForm) {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      }, error => {
        console.log(error);
        this.alertify.error(error);
      });
      this.nameEditOn = false;
  }

  nameEditClick() {
    this.nameEditOn = !this.nameEditOn;
  }

  roleEditClick() {
    this.roleEditOn = !this.roleEditOn;
  }

}
