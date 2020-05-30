import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/_models/group';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserAssignment } from 'src/app/_models/userAssignment';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
  queries: {
  'tabsContentRef': new ViewChild( 'tabsContentRef' )
    }
})
export class AssignmentDetailComponent implements OnInit {
  @Input() user: User;
  editForm: FormGroup;
  accessor: User;
  assignment: any;
  userAssignment: UserAssignment;
  group: Group;
  messages: Message[];
  newMessage: any = {};
  userInfo: any = {};
  userInfoArray: any = [];
  operatingRole: string;
  href: string;
  tabsContentRef!: ElementRef;
  colorOptions = [{'color': 'cornflowerblue'},
                  {'color': 'coral'},
                  {'color': 'goldenrod'},
                  {'color': 'lawngreen'},
                  {'color': 'blueviolet'},
                  {'color': 'darkred'}];

  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.operatingRole = data['operatingRole'];
      this.assignment = data['assignment'].assignment;
      this.userAssignment = data['assignment'];
      this.group = data['group'];
      if (this.operatingRole !== 'Admin') {
        this.messages = data['messages'];
      }
      this.user = data['user'];
      this.accessor = JSON.parse(localStorage.getItem('user'));
      this.createAssignmentCheckboxForm();
    });
    if (this.messages) {
      this.generateMessageColor();
    }
    this.href = this.router.url;
    // this.loadAssignmentMessages(this.user.id, this.assignment.id);
    console.dir(this.assignment);
  }

  createAssignmentCheckboxForm() {
    this.editForm = this.fb.group({
      completed: [this.userAssignment.completed]
    });
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
    const sortedGroup = this.group.userGroups.sort((a, b) => a.userId - b.userId);
    for (let i = 0; i < sortedGroup.length; i++) {
      sortedGroup[i].groupChatCol = this.colorOptions[i];
    }

    for (let j = 0; j < this.messages.length; j++) {
      const fontColorGetter = sortedGroup.find(u => u.userId === this.messages[j].senderId);

      this.messages[j].fontColor = fontColorGetter.groupChatCol;
      if (this.accessor.id === this.messages[j].senderId) {
        this.userInfo.color = fontColorGetter.groupChatCol;
      }
    }

  }

  sendMessage() {
    this.newMessage.recipientIds = this.getRecipientId();
    this.newMessage.assignmentId = this.assignment.id;
    this.newMessage.senderId = this.accessor.id;
    this.newMessage.groupId = this.accessor.userGroups[0].groupId;
    // this.newMessage.senderPhotoUrl = this.authService.currentUser.photoUrl;
    // this.newMessage.senderKnownAs = this.authService.currentUser.username;
    this.userService.sendAssignmentMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
      message.fontColor = this.userInfo.color;
      this.messages.unshift(message);
      this.newMessage.content = '';
      this.scrollTabContentToTop();
    }, error => {
      this.alertify.error(error);
    });
  }

  getRecipientId() {
    const recipientIds = [];
    for (let i = 0; i < this.group.userGroups.length; i++) {
      const element = this.group.userGroups[i].user.id ;
      recipientIds.push(element);
    }
    return recipientIds;
  }

  edit(compBool: boolean) {
    if (this.editForm.valid) {
      this.userAssignment.completed = compBool;
      this.assignmentService.updateUserAssignment(this.authService.decodedToken.nameid, this.userAssignment).subscribe(() => {
        console.log('success');
      }, error => {
        console.log(error);
      });
    }
  }

  scrollTabContentToTop(): void {
  this.tabsContentRef.nativeElement.scrollTo( 0, 0 );
  }

}
