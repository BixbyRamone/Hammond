import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from 'src/app/_models/assignment';

@Component({
  selector: 'app-mentor-assignments-tab',
  templateUrl: './mentor-assignments-tab.component.html',
  styleUrls: ['./mentor-assignments-tab.component.css']
})
export class MentorAssignmentsTabComponent implements OnInit {
  assignments: Assignment[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const test = data['assignments'];
      console.log(test);
    });
  }

}
