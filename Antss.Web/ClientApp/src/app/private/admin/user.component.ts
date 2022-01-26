import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Office } from '@core/models/office';
import { AppStoreService } from "@core/app.store.service";
import { ApiService } from '@core/api.service';
import { FormModes } from '@app/core/enums/form-modes';
import { User } from '@app/core/models/user/user';
import { PostResult } from '@core/models/post-result';

@Component({
  selector: 'create-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
  public offices$!: Observable<Office[]>;
  public userTypes$!: Observable<any[]>;

  submitted = false;
  registerForm!: FormGroup;
  formMode: FormModes = FormModes.Create;
  formModeDescription: string = 'Create';
  userId!: number;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private appStoreService: AppStoreService,
    private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      if (this.formMode == FormModes.Create) {
        this.createUser(this.registerForm.value)  
      } else {
        this.updateUser(this.registerForm.value);
      }
    }
  }
  ngOnInit() {
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      const routeParams = this.route.snapshot.paramMap;
      this.userId = Number(routeParams.get('id'));
      this.initialiseUser(this.userId);
      let editing = this.userId > 0;
      this.formMode = editing ? FormModes.Edit : FormModes.Create;
      this.formModeDescription = editing ? "Edit" : "Create";
    }));

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      userTypeId: ['', [Validators.required]],
      officeId: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]]
    });

    this.offices$ = this.appStoreService.offices$;
    this.userTypes$ = this.appStoreService.userTypes$;
  }
  createUser(user: User) {
    this.apiService.createUser(user)
    .pipe(first()).subscribe(
    result => {
      this.onPostResponse(result);
    },
    error => {
      console.log(error);
      alert('There was an error creating the user');
    })
  }
  updateUser(user: User) {
    user.id = this.userId;

    this.apiService.updateUser(user)
    .pipe(first()).subscribe(
    result => {
      this.onPostResponse(result);
    },
    error => {
      console.log(error);
      alert('There was an error editing the user');
    })
  }
  onPostResponse(result: PostResult) {
    if (result.isValid) {
      this.router.navigate(['/user-list']);
    } else {
      alert(result.errorMessage);
    }
  }
  initialiseUser(userId: number) {
    if (userId) {
      this.apiService.loadUser(userId)
      .pipe(first()).subscribe(
        x => {
        this.registerForm.patchValue(x);
        this.registerForm.patchValue({userTypeId: x.userTypeId.toString()}); //TODO: string / int mismatch but same numeric id
      });
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(x => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}

