import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Group } from 'src/app/_models/group';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stud-group-tab',
  templateUrl: './stud-group-tab.component.html',
  styleUrls: ['./stud-group-tab.component.css']
})
export class StudGroupTabComponent implements OnInit {
  @Input() group;
  user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = JSON.parse(localStorage.getItem('user'));
    });
    console.dir(this.user);
    console.dir(this.group);
  }

}
