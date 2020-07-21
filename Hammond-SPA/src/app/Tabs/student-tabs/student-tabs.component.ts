import { Component, OnInit, Input, EventEmitter, SimpleChanges, Output } from '@angular/core';
import { TabsService } from 'src/app/_services/tabs.service';

@Component({
  selector: 'app-student-tabs',
  templateUrl: './student-tabs.component.html',
  styleUrls: ['./student-tabs.component.css']
})
export class StudentTabsComponent implements OnInit {
  @Input() swiped: string;
  @Output() swipeReset = new EventEmitter;
  private _state: boolean;
  stateChanged: EventEmitter<boolean> = new EventEmitter();
  studentTabsObj = {
    tab1: 'active',
    tab2: 'inactive',
    tab3: 'inactive',
    tab4: 'inactive',
    tab5: 'inactive'
  };
  studentTabsArray = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];

  constructor(private _tabsService: TabsService) { }

  ngOnInit() {
    if (localStorage.getItem('lastTab')) {
      this.storedTab();
    }
    console.log(this.swiped);
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

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.swipe(changes.swiped.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values  
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
