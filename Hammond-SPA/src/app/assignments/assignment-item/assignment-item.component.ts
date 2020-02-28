import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-assignment-item',
  templateUrl: './assignment-item.component.html',
  styleUrls: ['./assignment-item.component.css']
})
export class AssignmentItemComponent implements OnInit {
  @Input() assignment: any;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
