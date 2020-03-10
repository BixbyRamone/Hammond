import { Component, OnInit, Input } from '@angular/core';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  // @Input() assignment: any;
  @Input() user: User;
  accessor: User;
  assignment: any;
  messages: Message[];
  newMessage: any = {};
  userInfo: any = {};
  userInfoArray: any = [];
  currentStyle = {};
  operatingRole: string;
  href: string;
  colorOptions = [{'color': 'cornflowerblue'},
                  {'color': 'coral'},
                  {'color': 'goldenrod'},
                  {'color': 'lawngreen'},
                  {'color': 'blueviolet'},
                  {'color': 'darkred'}];
                  test: any;

  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.operatingRole = data['operatingRole'];
      this.assignment = data['assignment'];
      if (this.operatingRole !== 'Admin') {
        this.messages = data['messages'];
      }
      this.user = data['user'];
      console.dir(this.user);
      this.accessor = JSON.parse(localStorage.getItem('user'));
      console.dir(this.accessor);
    });
    this.generateMessageColor();
    this.href = this.router.url;
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
    this.newMessage.recipientId = this.getRecipientId();
    this.newMessage.assignmentId = this.assignment.id;
    this.newMessage.senderId = this.accessor.id;
    this.newMessage.groupId = this.accessor.userGroups[0].groupId;
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

  getRecipientId() {
    const url = this.href.split('/');
    const returnable = url[url.length - 3];

    return returnable;
  }
}
