import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredential } from '@app/core/models/login-credential';
import { AuthenticationService } from '@core/authentication.service';

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
    let credential = new LoginCredential();
    credential.userId = parseInt(this.userId.toString()); //TODO why is string otherwise
    this.authenticationService.login(credential);
  }
}
