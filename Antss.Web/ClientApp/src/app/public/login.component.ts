import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '@app/core/base-components/base-form-component';

import { AuthenticationService } from '@core/authentication.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
})

export class LoginComponent extends BaseFormComponent implements OnInit {
  userId: number = 0;
  emailAddress!: string;
  password!: string;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { 
    super();    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (super.beforeSubmit()) return;

    this.authenticationService.login(this.form.value);
  }
}
