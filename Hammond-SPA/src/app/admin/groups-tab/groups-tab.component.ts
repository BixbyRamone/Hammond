import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-groups-tab',
  templateUrl: './groups-tab.component.html',
  styleUrls: ['./groups-tab.component.css']
})
export class GroupsTabComponent implements OnInit {
  @Input() loadedUserGroups;
  @Input() loadedGroups;
  groupRegisterMode = false;
  groupListMode = false;

  constructor() { }

  ngOnInit() {
    console.dir(this.loadedUserGroups);
  }

  registerToggle() {
    this.groupListMode = false;
    this.groupRegisterMode = true;
  }

  listToggle() {
    this.groupRegisterMode = false;
    this.groupListMode = true;
  }

  cancelGroupRegistration(modeSwitch: boolean) {
    this.groupRegisterMode = modeSwitch;
  }

  cancelGroupList(modeSwitch: boolean) {
    this.groupListMode = modeSwitch;
  }

}
