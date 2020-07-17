import { Component, OnInit } from '@angular/core';
import { TabsService } from 'src/app/_services/tabs.service';

@Component({
  selector: 'app-admin-tabs',
  templateUrl: './admin-tabs.component.html',
  styleUrls: ['./admin-tabs.component.css']
})
export class AdminTabsComponent implements OnInit {
  adminTabObjSel = {
    tab1: 'active',
    tab2: 'inactive',
    tab3: 'inactive',
    tab4: 'inactive',
    tab5: 'inactive',
    tab6: 'inactive',
    tab7: 'inactive'
  };

  constructor(private _tabsService: TabsService) { }

  ngOnInit() {
    if (localStorage.getItem('lastTab')) {
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
    localStorage.setItem('lastTab', event.srcElement.id);
  }

  storedTab() {
    for (const prop in this.adminTabObjSel) {
      if (prop === localStorage.getItem('lastTab')) {
        this.adminTabObjSel[prop] = 'active';
        this._tabsService.sendTab(prop);
      } else {
        this.adminTabObjSel[prop] = 'inactive';
      }
    }
  }

}
