import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CurrentUser } from '@core/models/current-user';
import { User } from '@core/models/user';
import { AppStoreService } from "@core/app.store.service";
import { first } from 'rxjs/operators';
import { ApiService } from '@core/api.service';

@Component({
  selector: 'create-ticket',
  templateUrl: './create-ticket.component.html'
})

export class CreateTicketComponent implements OnInit {
  public currentUser$!: Observable<CurrentUser>;
  public currentUserId: number = 0;
  public userName: string = '';
  public users$!: Observable<User[]>;

  private subscriptions: Subscription[] = [];

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
      this.apiService.createTicket(this.registerForm.value)
      .pipe(first()).subscribe(
        result => {
          this.router.navigate(['/ticket-list']);
        },
        error => {
          console.error(error);
          alert('There was an error creating the ticket: ' + error)
        }
      )
    }
  }

  ngOnInit() {
    var currentUserSubscription = this.appStoreService.currentUser$
      .subscribe(x => {
        this.currentUserId = x.id
        this.userName = `${x.firstName} ${x.lastName}`;
      });

    this.subscriptions.push(currentUserSubscription);

    //
    // TODO: populate Users array with all existing users so that admins may override assignedTo and raisedBy values
    //

    this.registerForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      raisedBy: [this.userName, [Validators.required]],
      assignedTo: [null]
    });
  }

  // ngOnDestroy() {
  //   this.subscriptions.forEach(x => {
  //     if (!x.closed) {
  //       x.unsubscribe();
  //     }
  //   });
  // }
}

