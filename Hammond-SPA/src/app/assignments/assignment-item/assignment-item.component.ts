import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignment-item',
  templateUrl: './assignment-item.component.html',
  styleUrls: ['./assignment-item.component.css']
})
export class AssignmentItemComponent implements OnInit {
  @Input() assignment: any;
  @Input() user: User;
  operatingUserRole: any;

  constructor(private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.operatingUserRole = data.operatingUserRole;
    });
  }

  // setOperatingUserRole() {
  //   let role = this.authService.decodedToken.role;
  //   if (this.operatingUserRole.length > 1) {
  //     if (this.operatingUserRole.includes('Admin')) {
  //       role = 'Admin';
  //     }
  //   }
  //   return role;
  // }

}
