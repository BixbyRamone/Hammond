import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-student-dropbox',
  templateUrl: './student-dropbox.component.html',
  styleUrls: ['./student-dropbox.component.css']
})
export class StudentDropboxComponent implements OnInit {
  @Output() cancelDropBox = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  backup() {
    this.cancelDropBox.emit(false);
  }

}
