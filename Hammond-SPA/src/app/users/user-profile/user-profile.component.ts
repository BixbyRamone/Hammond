import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Role } from 'src/app/_models/role';
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
  roleOptions = [{value: 'student', name: 'Student', checked: false, roleId: 1},
                 {value: 'tutor', name: 'Tutor', checked: false, roleId: 2},
                 {value: 'mentor', name: 'Mentor', checked: false, roleId: 3},
                 {value: 'admin', name: 'Admin', checked: false, roleId: 4} ];

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
      console.log(this.testForStudentRole());

      this.alertifyMessage = 'Are you sure you want to remove ' + this.user.firstName + ' ' +
      this.user.lastName + '\'s profile?';
      let iterator = 1;
      this.roleOptions.forEach(element => {
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

  updateUserRoles(editForm: NgForm) {
    this.userService.updateUserRoles(this.authService.decodedToken.nameid, this.user, this.getTrueRoles())
      .subscribe(next => {
        this.alertify.success('Profile updated successfully');
      }, error => {
        console.log(error);
        this.alertify.error(error);
      });
      this.roleEditOn = false;
  }

  getTrueRoles() {
    const trueRoles = [];
    this.roleOptions.filter((opt) => {
      if (opt.checked === true) {
        const role = {
          roleId: opt.roleId,
          roleName: opt.value,
          role: opt
        };
        trueRoles.push(role);
      }
    });
    this.user.userRoles = trueRoles;
    return trueRoles;
  }

  testForStudentRole() {
for (let i = 0; i < this.user.userRoles.length; i++) {
  const compVar = this.user.userRoles[i].role.id;
    if (compVar === 1) {
      return true;
      }
        break;
    }
    return false;
  }

  nameEditClick() {
    this.nameEditOn = !this.nameEditOn;
  }

  roleEditClick() {
    this.roleEditOn = !this.roleEditOn;
  }

}
