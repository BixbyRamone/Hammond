import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/_models/group';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GroupService } from 'src/app/_services/group.service';
import { AuthService } from 'src/app/_services/auth.service';

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
    this.alertify.confirm('Are yousure you want to disband this group?', () => {
      this.groupService.disbandGroup(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.alertify.success('User has been deleted');
      }, error => {
        this.alertify.error('Failed to delete this user');
      });
    });
  }

}
