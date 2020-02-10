import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserGroup } from 'src/app/_models/usergroup';
import { Role } from 'src/app/_models/role';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/app/_services/group.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  groupMembers: any;
  alertifyMessage: string;
  nameEditOn = false;
  roleEditOn = false;
  addActOn = false;
  roleOptions = [{value: 'tutor', name: 'Tutor', checked: false, roleId: 2},
                 {value: 'mentor', name: 'Mentor', checked: false, roleId: 3},
                 {value: 'admin', name: 'Admin', checked: false, roleId: 4} ];
  actForm: FormGroup;
  actAvg: any;
  actExpandView = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private groupService: GroupService,
    private alertify: AlertifyService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
      if (this.user.userGroups.length > 0) {
        this.groupService.getGroup(this.user.userGroups[0].groupId)
        .subscribe((res: any) => {
          this.groupMembers = res.userGroups;
          console.dir(this.groupMembers);
        }, error => {
          this.alertify.error(error);
        });
      }

      this.createActForm();
      this.actAvg = this.averageActScore();

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

  createActForm() {
    this.actForm = this.fb.group({
      score: ['', Validators.required],
      dayOfScore: ['']
    });
  }

  submitActScore(formValues: any) {
    if (this.actForm.valid) {
      this.userService.updateUserActScores(this.authService.decodedToken.nameid, this.user, this.actForm)
      .subscribe(next => {
        this.alertify.success('Profile updated successfully');
      }, error => {
        console.log(error);
        this.alertify.error(error);
      });
      this.addActOn = false;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/users/' + this.user.id]);
    });
    }
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

  // ifUserRolesStudent() {
  // let found = false;
  // for (let i = 0; i < this.user.userRoles.length; i++) {
  //   if (this.user.userRoles[i].role.roleName === 'student') {
  //       found = true;
  //       break;
  //     }
  //   }
  //   return found;
  // }

  averageActScore() {
    const avg = array => array.reduce((p, c) => p + c.score, 0 ) / this.user.actScores.length;
    return avg(this.user.actScores).toFixed(2);
  }

  nameEditClick() {
    this.nameEditOn = !this.nameEditOn;
  }

  roleEditClick() {
    this.roleEditOn = !this.roleEditOn;
  }

  actAddOnClick() {
    this.addActOn = !this.addActOn;
  }

  actExpandClick() {
    this.actExpandView = !this.actExpandView;
  }

}
