import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/_models/group';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GroupService } from 'src/app/_services/group.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  groups: Group[];
  pagination: Pagination;
  userParams: any = {};
  studentLevel = [{value: 'sophomore', display: 'Sophomores'}, {value: 'junior', display: 'Juniors'},
                  {value: 'senior', display: 'Seniors'} ];

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

  loadGroups() {
    this.groupService.getGroups(this.userParams)
      .subscribe((res: PaginatedResult<Group[]>) => {
        this.groups = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  disbandGroup(id: number) {
    console.dir(this.groupService);
    this.alertify.confirm('Are yousure you want to disband this group?', () => {
      this.groupService.disbandGroup(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.loadGroups();
        this.alertify.success('Group has been disbanded');
      }, error => {
        this.alertify.error('Failed to disband group');
      });
    });
  }

  removeMember(ug: any) {
    if (ug.group.userGroups.length === 0) {
      this.disbandGroup(ug.group.id);
    } else {
      console.dir(ug);
      const id: number = ug.user.id;
      this.alertify.confirm('Remove ' + ug.user.firstName + ' ' + ug.user.lastName + ' from this group?', () => {
      this.groupService.removeUserFromGroup(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.loadGroups();
        this.alertify.success('User has been removed from group');
          }, error => {
         this.alertify.error('Failed to remove user from group');
            console.log(error);
        });
      });
    }
  }

}
