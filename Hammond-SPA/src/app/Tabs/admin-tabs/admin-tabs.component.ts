import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { TabsService } from 'src/app/_services/tabs.service';

@Component({
  selector: 'app-admin-tabs',
  templateUrl: './admin-tabs.component.html',
  styleUrls: ['./admin-tabs.component.css']
})
export class AdminTabsComponent implements OnInit {
  @Input() swiped: string;
  adminTabObjSel = {
    tab1: 'active',
    tab2: 'inactive',
    tab3: 'inactive',
    tab4: 'inactive',
    tab5: 'inactive',
    tab6: 'inactive',
    tab7: 'inactive'
  };

  initiate = true;

  constructor(private _tabsService: TabsService) { }

  ngOnInit() {
    if (localStorage.getItem('lastTabVisit')) {
      this.storedTab();
    }
  }

  clickATab(event: any) {
    for (const prop in this.adminTabObjSel) {
      if (prop === event.srcElement.id) {
        this.adminTabObjSel[prop] = 'active';
        this._tabsService.sendTab(event.srcElement.id);
      } else {
        this.adminTabObjSel[prop] = 'inactive';
      }
    }
    localStorage.setItem('lastTabVisit', event.srcElement.id);
  }

  storedTab() {
    for (const prop in this.adminTabObjSel) {
      if (prop === localStorage.getItem('lastTabVisit')) {
        this.adminTabObjSel[prop] = 'active';
        this._tabsService.sendTab(prop);
      } else {
        this.adminTabObjSel[prop] = 'inactive';
      }
    }
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    !this.initiate ? this.swipe(changes.swiped.currentValue) : this.initiate = false;
    // this.swipe(changes.swiped.currentValue);
}

swipe(newTab: string) {
  for (const prop in this.adminTabObjSel) {
    if (prop === newTab) {
      this.adminTabObjSel[prop] = 'active';
      this._tabsService.sendTab(newTab);
    } else {
      this.adminTabObjSel[prop] = 'inactive';
    }
  }
  localStorage.setItem('lastTab', newTab);
 }

}
