import { Component, OnInit } from '@angular/core';
import { TabsService } from 'src/app/_services/tabs.service';

@Component({
  selector: 'app-volunteer-tabs',
  templateUrl: './volunteer-tabs.component.html',
  styleUrls: ['./volunteer-tabs.component.css']
})
export class VolunteerTabsComponent implements OnInit {
  volunteerTabsObj = {
    tab1: 'active',
    tab2: 'inactive',
    tab3: 'inactive',
    tab4: 'inactive',
    tab5: 'inactive'
  };

  constructor(private _tabsService: TabsService) { }

  ngOnInit() {
    if (localStorage.getItem('lastTab')) {
      this.storedTab();
    }
  }

  clickATab(event: any) {
    for (const prop in this.volunteerTabsObj) {
      if (prop === event.srcElement.id) {
        this.volunteerTabsObj[prop] = 'active';
        this._tabsService.sendTab(event.srcElement.id);
      } else {
        this.volunteerTabsObj[prop] = 'inactive';
      }
    }
    localStorage.setItem('lastTab', event.srcElement.id);
  }

  storedTab() {
    for (const prop in this.volunteerTabsObj) {
      if (prop === localStorage.getItem('lastTab')) {
        this.volunteerTabsObj[prop] = 'active';
        this._tabsService.sendTab(prop);
      } else {
        this.volunteerTabsObj[prop] = 'inactive';
      }
    }
  }

}
