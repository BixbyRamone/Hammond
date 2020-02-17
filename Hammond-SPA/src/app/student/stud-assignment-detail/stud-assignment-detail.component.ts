import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-stud-assignment-detail',
  templateUrl: './stud-assignment-detail.component.html',
  styleUrls: ['./stud-assignment-detail.component.css']
})
export class StudAssignmentDetailComponent implements OnInit {
  @Input() assignment: any;
  user: User;
  messages: Message[];
  newMessage: any = {};

  constructor(private assignmentService: AssignmentService,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.dir(this.user);
  }

}
