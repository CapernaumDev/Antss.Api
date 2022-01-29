import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AppStoreService } from "@core/app.store.service";
import { ApiService } from '@core/api.service';
import { FormModes } from '@app/core/enums/form-modes';
import { User } from '@app/core/models/user/user';
import { PostResult } from '@core/models/post-result';
import { OptionItem } from '../../core/models/option-item';
import { BaseFormComponent } from '../../core/base-components/base-form-component';

@Component({
  selector: 'create-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user.component.html'
})

export class UserComponent extends BaseFormComponent implements OnInit {
  FormModes = FormModes;
  public offices$!: Observable<OptionItem[]>;
  public userTypes$!: Observable<OptionItem[]>;

  formMode: FormModes = FormModes.Create;
  formModeDescription: string = 'Create';
  userId!: number;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private appStoreService: AppStoreService,
    private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    super();
  }

  onSubmit() {
    if (!super.beforeSubmit()) return;
    
    if (this.formMode == FormModes.Create) {
      this.createUser(this.registerForm.value)  
    } else {
      this.updateUser(this.registerForm.value);
    }
  }

  cancelAndReturn() {
    if (this.registerForm.dirty && !confirm("Are you sure you wish to cancel?")) return;

    this.router.navigate(['user-list'])
  }

  ngOnInit() {
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      const routeParams = this.route.snapshot.paramMap;
      this.userId = Number(routeParams.get('id'));
      this.initialiseUser(this.userId);
      let editing = this.userId > 0;
      this.formMode = editing ? FormModes.Edit : FormModes.Create;
      
      this.registerForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        emailAddress: ['', [Validators.required, Validators.email]],
        userTypeId: ['', [Validators.required]],
        officeId: ['', [Validators.required]],
        contactNumber: ['', [Validators.required]],
        password: ['', Validators.required]
      });

      if (editing)
        this.registerForm.controls["password"].removeValidators([Validators.required]);

      this.formModeDescription = editing ? "Edit" : "Create";
    }));

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
      alert('There was an error editing the user');
    })
  }
  onPostResponse(result: PostResult) {
    if (result.isValid) {
      this.router.navigate(['/user-list']);
    } else {
      alert(result.errorMessage);
    }

    this.saving = false;
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

