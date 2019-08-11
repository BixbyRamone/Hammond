import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RoleService } from 'src/app/_services/role.service';
import { User } from 'src/app/_models/user';
import { debug } from 'util';

@Component({
  selector: 'app-volunteer-registration',
  templateUrl: './volunteer-registration.component.html',
  styleUrls: ['./volunteer-registration.component.css']
})
export class VolunteerRegistrationComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter;
  registerForm: FormGroup;
  user: User;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      userRole: ['', Validators.required],
      studentLevel: ['sophmore', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    },  {validator: this.passwordMatchValidator});
  }

  register() {

    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user, this.user.userRole).subscribe(() => {
        this.alertify.success('Registration succesful');
      }, error => {
        console.log('error: ' + error);
        this.alertify.error(error);
      });
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  backup() {
    this.cancelRegister.emit(false);
  }

}
