import { Component, OnInit } from '@angular/core';
import { TabsService } from '../_services/tabs.service';

@Component({
  selector: 'app-test-tabs',
  templateUrl: './test-tabs.component.html',
  styleUrls: ['./test-tabs.component.css']
})
export class TestTabsComponent implements OnInit {
  exampleTabClass: string;
  testTabObjSel = {
    tab1: 'active',
    tab2: 'inactive',
    tab3: 'inactive',
    tab4: 'inactive',
    tab5: 'inactive',
    tab6: 'inactive',
    tab7: 'inactive',

  };

  constructor(private _tabsService: TabsService) { }

  ngOnInit() {
    this.exampleTabClass = 'true';
  }

  clickATab(event: any) {
    for (const prop in this.testTabObjSel) {
      if (prop === event.srcElement.id) {
        this.testTabObjSel[prop] = 'active';
        this._tabsService.sendTab(event.srcElement.id);
      } else {
        this.testTabObjSel[prop] = 'inactive';
      }
    }
  }



}
