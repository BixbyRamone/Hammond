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
      console.log(this.student);
      this.assignments = this.user.userAssignments;
      this.averageAct = this.calculateAvgScores();
    });
  }

  calculateAvgScores() {
    const returnNum = this.student.actScores.reduce((sum, score) => {
      console.log(sum);
      console.log(score);
      return ((sum + score) / this.student.actScores.length);
    });
    return null;
  }

}
