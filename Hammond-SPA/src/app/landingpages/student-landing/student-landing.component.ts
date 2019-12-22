import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { Group } from 'src/app/_models/group';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-student-landing',
  templateUrl: './student-landing.component.html',
  styleUrls: ['./student-landing.component.css']
})
export class StudentLandingComponent implements OnInit {
  @ViewChild('studentTabs') studentTabs: TabsetComponent;
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  user: User;
  group: Group;
  messages: Message[];
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
      this.group = data['group'];
      console.dir(this.user);
    });

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

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, 1, 15, 'Unread')
        .subscribe((res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
  }

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
          const swipe = direction[0] < 0 ? 'next' : 'previous';
          // Do whatever you want with swipe
          const selectedTab = this.getTabMethod();

          if (swipe === 'next') {
            if (selectedTab !== this.studentTabs.tabs.length - 1) {
              this.studentTabs.tabs[selectedTab + 1].active = true;
            }
          } else if (swipe === 'previous') {
              if (selectedTab !== 0) {
                this.studentTabs.tabs[selectedTab - 1].active = true;
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

}
