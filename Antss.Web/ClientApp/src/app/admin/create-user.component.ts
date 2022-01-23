import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../models/user';
import { Office } from '../models/office';
import { AppStoreService } from "../app.store";

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html'
})

export class CreateUserComponent implements OnInit {
  public offices$!: Observable<Office[]>;

  submitted = false;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private appStoreService: AppStoreService,
    private apiService: ApiService, private router: Router ) { }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      this.apiService.createUser(this.registerForm.value).subscribe({
        next: result => {
          this.router.navigate(['/user-list'])
        },
        error: error => {
          console.log(error);
          alert('There was an error creating the user');
        }
      })
    }

  }
  ngOnInit() {
    this.offices$ = this.appStoreService.offices$;

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

