import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/_models/group';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GroupService } from 'src/app/_services/group.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  groups: Group[];

  constructor(
      private route: ActivatedRoute,
      private alertify: AlertifyService,
      private groupService: GroupService,
      private authService: AuthService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.groups = data['groups'].result;
    });
    console.dir(this.groups);
  }

  disbandGroup(id: number) {
    console.dir(this.groupService);
    this.alertify.confirm('Are yousure you want to disband this group?', () => {
      this.groupService.disbandGroup(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.alertify.success('User has been deleted');
      }, error => {
        this.alertify.error('Failed to delete this user');
      });
    });
  }

  removeMember(user: User) {
    console.dir(this.groupService);
    const idTest: number = user.id;
    this.alertify.confirm('Remove ' + user.firstName + ' from this group?', () => {
      this.groupService.removeUserFromGroup(idTest, this.authService.decodedToken.nameid).subscribe(() => {
        this.alertify.success('User has been removed from group');
      }, error => {
        this.alertify.error('Failed to remove user from group');
        console.log(error);
      });
    });
  }

}
