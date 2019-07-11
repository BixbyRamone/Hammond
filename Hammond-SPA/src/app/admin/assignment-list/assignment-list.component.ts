import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  backup() {
    this.cancel.emit(false);
  }

}
