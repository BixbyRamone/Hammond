import { Component, OnInit, Input } from '@angular/core';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  // @Input() assignment: any;
  @Input() user: User;
  assignment: any;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.assignment = data['assignment'];
      this.user = JSON.parse(localStorage.getItem('user'));
    });
    console.dir(this.assignment);
    this.loadAssignmentMessages(this.user.id, this.assignment.id);
  }

  loadAssignmentMessages(id, assignmentId) {
    console.dir('loaded assignments');
    this.assignmentService.getAssignmentMessages(id, assignmentId)
      .subscribe((res:  Message[]) => {
        this.messages = res;
      }, error => {
        this.alertify.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.user.id;
    // this.newMessage.senderId = this.authService.currentUser.id;
    // this.newMessage.senderPhotoUrl = this.authService.currentUser.photoUrl;
    // this.newMessage.senderKnownAs = this.authService.currentUser.username;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
        // debugger;
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
