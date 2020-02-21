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
  userInfo: any = {};
  userInfoArray: any = [];
  currentStyle = {};
  colorOptions = [{'color': 'cornflowerblue'},
                  {'color': 'coral'},
                  {'color': 'gold'},
                  {'color': 'lawngreen'},
                  {'color': 'blueviolet'}];

  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.assignment = data['assignment'];
      this.messages = data['messages'];
      this.user = JSON.parse(localStorage.getItem('user'));
    });
    this.generateMessageColor();
    // this.loadAssignmentMessages(this.user.id, this.assignment.id);
    console.dir(this.messages);
  }

  loadAssignmentMessages(id, assignmentId) {
    this.assignmentService.getAssignmentMessages(id, assignmentId)
      .subscribe((res: Message[]) => {
         this.messages = res;
      }, error => {
        this.alertify.error(error);
      });
  }

  generateMessageColor() {
    let colorOptionsIterator = -1;
    for (let index = 0; index < this.messages.length; index++) {
      this.userInfo.id = this.messages[index].senderId;
      colorOptionsIterator++;
      if (colorOptionsIterator > this.colorOptions.length) {
        colorOptionsIterator = 0;
      }
      console.dir(colorOptionsIterator);
      this.userInfo.color = this.colorOptions[colorOptionsIterator];
      if (!this.userInfoArray.includes(this.userInfo)) {
        this.userInfoArray.push(this.userInfo);
      }

      this.userInfoArray.forEach(userInfoElement => {
        this.messages.forEach(messageElement => {
          if (userInfoElement.id === messageElement.senderId) {
            messageElement.fontColor = userInfoElement.color;
          }
        });
      });

    }
  }

  sendMessage() {
    this.newMessage.recipientId = this.user.id;
    this.newMessage.assignmentId = this.assignment.id;
    // this.newMessage.senderId = this.authService.currentUser.id;
    // this.newMessage.senderPhotoUrl = this.authService.currentUser.photoUrl;
    // this.newMessage.senderKnownAs = this.authService.currentUser.username;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
      // this.generateMessageColor();
    }, error => {
      this.alertify.error(error);
    });
  }

}
