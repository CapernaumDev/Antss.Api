import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Office } from '@core/models/office';
import { AppStoreService } from "@core/app.store.service";
import { first } from 'rxjs/operators';
import { ApiService } from '@core/api.service';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html'
})

export class CreateUserComponent implements OnInit {
  public offices$!: Observable<Office[]>;
  public userTypes$!: Observable<any[]>;

  submitted = false;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private appStoreService: AppStoreService,
    private apiService: ApiService, private router: Router) { }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      this.apiService.createUser(this.registerForm.value)
        .pipe(first()).subscribe(
        result => {
          this.router.navigate(['/user-list']);
        },
        error => {
          console.log(error);
          alert('There was an error creating the user');
        }
      )
    }

  }
  ngOnInit() {
    this.offices$ = this.appStoreService.offices$;
    this.userTypes$ = this.appStoreService.userTypes$;

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      userType: ['', [Validators.required]],
      officeId: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]]
    });
  }
}

