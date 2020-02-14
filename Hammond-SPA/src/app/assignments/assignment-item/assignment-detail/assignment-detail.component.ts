import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignment: any;

  constructor() { }

  ngOnInit() {
  }

}
