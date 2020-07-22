import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { TabsService } from 'src/app/_services/tabs.service';

@Component({
  selector: 'app-volunteer-tabs',
  templateUrl: './volunteer-tabs.component.html',
  styleUrls: ['./volunteer-tabs.component.css']
})
export class VolunteerTabsComponent implements OnInit {
  @Input() swiped: string;
  volunteerTabsObj = {
    tab1: 'active',
    tab2: 'inactive',
    tab3: 'inactive',
    tab4: 'inactive',
    tab5: 'inactive'
  };
  initiate = true;

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

    // tslint:disable-next-line: use-life-cycle-interface
    ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
      !this.initiate ? this.swipe(changes.swiped.currentValue) : this.initiate = false;
  }

  swipe(newTab: string) {
    for (const prop in this.volunteerTabsObj) {
      if (prop === newTab) {
        this.volunteerTabsObj[prop] = 'active';
        this._tabsService.sendTab(newTab);
      } else {
        this.volunteerTabsObj[prop] = 'inactive';
      }
    }
    localStorage.setItem('lastTab', newTab);
   }

}
