import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stud-assignment-detail',
  templateUrl: './stud-assignment-detail.component.html',
  styleUrls: ['./stud-assignment-detail.component.css']
})
export class StudAssignmentDetailComponent implements OnInit {
  @Input() assignment: any;

  constructor() { }

  ngOnInit() {
  }

}
