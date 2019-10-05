import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Input() groups;

  constructor() { }

  ngOnInit() {
  }

  backup() {
    console.log('backup');
    this.cancel.emit(false);
  }

  test() {
    console.log('test()');
    console.dir(this.groups);
  }

}
