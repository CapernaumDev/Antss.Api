import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  userId: number = 0;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    var user = new User();
    user.id = this.userId;
    user.emailAddress = 'sd';
    user.firstName = 'asda';
    user.lastName = 'asdad';
    user.contactNumber = '12312';
    user.officeId = 1;
    user.userType = "1";

    this.authenticationService.login(user);
  }
}
