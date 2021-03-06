import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TabsService } from 'src/app/_services/tabs.service';

@Component({
  selector: 'app-student-tabs',
  templateUrl: './student-tabs.component.html',
  styleUrls: ['./student-tabs.component.css']
})
export class StudentTabsComponent implements OnInit {
  @Input() swiped: string;
  studentTabsObj = {
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
    for (const prop in this.studentTabsObj) {
      if (prop === event.srcElement.id) {
        this.studentTabsObj[prop] = 'active';
        this._tabsService.sendTab(event.srcElement.id);
      } else {
        this.studentTabsObj[prop] = 'inactive';
      }
    }
    localStorage.setItem('lastTab', event.srcElement.id);
  }

  storedTab() {
    for (const prop in this.studentTabsObj) {
      if (prop === localStorage.getItem('lastTab')) {
        this.studentTabsObj[prop] = 'active';
        this._tabsService.sendTab(prop);
      } else {
        this.studentTabsObj[prop] = 'inactive';
      }
    }
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    !this.initiate ? this.swipe(changes.swiped.currentValue) : this.initiate = false;
}

swipe(newTab: string) {
  for (const prop in this.studentTabsObj) {
    if (prop === newTab) {
      this.studentTabsObj[prop] = 'active';
      this._tabsService.sendTab(newTab);
    } else {
      this.studentTabsObj[prop] = 'inactive';
    }
  }
  localStorage.setItem('lastTab', newTab);
 }
}
