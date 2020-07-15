import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/app/_services/group.service';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  groupMembers: any;
  operatingUserRole: any;
  operatingUserName: any;
  operatingUserId: number;
  alertifyMessage: string;
  nameEditOn = false;
  roleEditOn = false;
  studentLevelEditOn = false;
  emailEditOn = false;
  addActOn = false;
  roleOptions = [{value: 'tutor', name: 'Tutor', checked: false, roleId: 2},
                 {value: 'mentor', name: 'Mentor', checked: false, roleId: 3},
                 {value: 'admin', name: 'Admin', checked: false, roleId: 4} ];
  studentLeveltOptions = [{value: 'sophomore', name: 'Sophomore', checked: false, id: 1},
                          {value: 'junior', name: 'Junior', checked: false, id: 2},
                          {value: 'senior', name: 'Senior', checked: false, id: 3}];
  actForm: FormGroup;
  actAvg: any;
  actExpandView = false;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private groupService: GroupService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private location: Location
    ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.operatingUserId = this.authService.decodedToken.nameid;
      this.user = data['user'];
      if (this.user.userGroups.length > 0) {
        this.groupService.getGroup(this.user.userGroups[0].groupId)
        .subscribe((res: any) => {
          this.groupMembers = res.userGroups;
        }, error => {
          this.alertify.error(error);
        });
      }
      this.operatingUserRole = this.authService.decodedToken.role;
      this.operatingUserName = this.authService.decodedToken.unique_name;
      // may change so that admin needs to be in specific role to access admin features
      if (this.operatingUserRole.length > 1) {
        if (this.operatingUserRole.includes('Admin')) {
          this.operatingUserRole = 'Admin';
        }
      }
      this.createActForm();
      this.actAvg = this.averageActScore();
      console.log(this.user);
      this.alertifyMessage = 'Are you sure you want to remove ' + this.user.firstName + ' ' +
      this.user.lastName + '\'s profile?';

      let iterator = 2; // starts at 2 to line up with id #'s;
      this.roleOptions.forEach(element => {
        element.checked = this.createCheckedState(iterator, this.user.userRoles);
        iterator++;
      });
      this.studentLeveltOptions.forEach(element => {
        element.checked = element.value === this.user.studentLevel;
      });
    });
  }

  createCheckedState(roleId: number, array: any[]) {
    const returnable = array.filter((opt) => {
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
      this.emailEditOn = false;
    }

  updateUserRoles(editForm: NgForm) {
    this.userService.updateUserRoles(this.authService.decodedToken.nameid, this.user, this.getTrueRoles())
      .subscribe(next => {
        this.alertify.success('Profile updated successfully');
      }, error => {
        console.log(error);
        this.alertify.error(error.message);
      });
      this.roleEditOn = false;
  }

  updateStudentLevel(editForm: NgForm) {
    const sL = this.studentLeveltOptions.find(e => e.checked === true);
    this.userService.updateStudentLevel(this.authService.decodedToken.nameid, this.user, sL.value)
      .subscribe(next => {
        this.alertify.success('Profile updated successfully');
        console.log(this.user);
        if (this.user.userGroups.length > 0) {
          this.groupService.removeUserFromGroup(this.user.id, this.authService.decodedToken.nameid).subscribe(() => {
          }, er => {
            console.log(er);
            this.alertify.error(er);
      });
        }
      }, error => {
        console.log(error);
        this.alertify.error(error.message);

      });
      this.studentLevelEditOn = false;
  }

  createActForm() {
    this.actForm = this.fb.group({
      score: ['', Validators.required],
      dayOfScore: [''],
      englishScore: [''],
      mathmaticsScore: [''],
      readingScore: [''],
      scienceScore: [''],
      writingScore: ['']
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
      this._document.defaultView.location.reload();
    }
  }

  deleteActScore(id: number) {
    this.alertify.confirm('Remove this ACT score?', () => {
      this.userService.deleteActScore(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.alertify.success('ACT score deleted');
        this._document.defaultView.location.reload();
      }, error => {
        console.log(error);
        this.alertify.error('Failed to remove ACT score');
      });
    });
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

  radioChecked(id) {
    this.studentLeveltOptions.forEach(item => {
      if (item.id !== id) {
         item.checked = false;
      } else {
         item.checked = true;
      }
    });
  }

  backup() {
    this.location.back();
  }

}
