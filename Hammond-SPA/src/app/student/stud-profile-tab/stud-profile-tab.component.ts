import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stud-profile-tab',
  templateUrl: './stud-profile-tab.component.html',
  styleUrls: ['./stud-profile-tab.component.css']
})
export class StudProfileTabComponent implements OnInit {
  @Input() student: User;
  user: User;
  assignments: any[];
  averageAct: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.assignments = this.user.userAssignments;
      if (this.student.actScores.length > 0) {
        this.averageAct = this.calculateAvgScores();
      };
    });
  }

  calculateAvgScores() {
    this.student.actScores.reduce((sum, score) => {
      return ((sum + score) / this.student.actScores.length);
    });
    return null;
  }

}
