import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-group-registration',
  templateUrl: './group-registration.component.html',
  styleUrls: ['./group-registration.component.css']
})
export class GroupRegistrationComponent implements OnInit {
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  backup() {
    console.log('backup');
    this.cancel.emit(false);
  }

}
