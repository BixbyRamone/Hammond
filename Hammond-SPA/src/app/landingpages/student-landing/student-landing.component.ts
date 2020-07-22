import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { Group } from 'src/app/_models/group';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { Message } from 'src/app/_models/message';
import { Session } from 'src/app/_models/session';
import { TabsService } from 'src/app/_services/tabs.service';

@Component({
  selector: 'app-student-landing',
  templateUrl: './student-landing.component.html',
  styleUrls: ['./student-landing.component.css']
})
export class StudentLandingComponent implements OnInit {
  @ViewChild('studentTabs') studentTabs: TabsetComponent;
  swiped: string;
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  user: User;
  setTab: string;
  group: Group;
  messages: Message[];
  session: any;
  pagination: Pagination;
  studentTabsArray = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private _tabsService: TabsService
  ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
      this.group = data['group'];
      this.messages = data['messages'];
      this.session = data['session'];
    });
this.swiped = '';
    this.setTab = localStorage.getItem('lastTab') ? localStorage.getItem('lastTab') : 'tab1';
    this._tabsService.tabSelection$.subscribe(
      message => {

        this.setTab = message;

      }
    );

    console.dir(this.user);

    this.route.queryParams.subscribe(params => {
      const selectTab = params['tab'];
      this.studentTabs.tabs[selectTab > 0 ? selectTab : 0].active = true;
    });
  }

  loadUser() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  // loadMessages() {
  //   this.userService.getMessages(this.authService.decodedToken.nameid, 1, 15, 'Unread')
  //       .subscribe((res: PaginatedResult<Message[]>) => {
  //         this.messages = res.result;
  //         this.pagination = res.pagination;
  //       }, error => {
  //         this.alertify.error(error);
  //       });
  // }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
          const pageTurn = direction[0] < 0 ? 'next' : 'previous';
          let arrayIndx = this.studentTabsArray.indexOf(localStorage.getItem('lastTab'));
          // Do whatever you want with swipe
          // const selectedTab = this.getTabMethod();

          if (pageTurn === 'next') {
            if (arrayIndx !== this.studentTabsArray.length - 1) {
              arrayIndx++;
              arrayIndx++;
              this.swiped = 'tab' + arrayIndx;
            }
          } else if (pageTurn === 'previous') {
              if (arrayIndx !== 0) {
                this.swiped = 'tab' + arrayIndx;
              }
          }
      }
    }
  }

  getTabMethod() {
    for (let index = 0; index < this.studentTabs.tabs.length; index++) {
      if (this.studentTabs.tabs[index].active === true) {
        return index;
      }
    }
  }
  onChange(value: string): void {
    console.log(value);
  }

  swipeReset(event: boolean) {
    if (event) {
      this.swiped = '';
    }
  }

}
