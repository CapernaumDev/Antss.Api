import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '@core/api.service';
import { Editor } from 'ngx-editor';
import { BaseFormComponent } from '@app/core/components/base-form-component';
import { AppState } from '@app/core/store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentUser } from '@app/core/models/user/current-user';
import { OptionItem } from '@app/core/models/option-item';
import { selectAssignableUsers, selectCurrentUser } from '@app/core/store/selectors';

@Component({
  selector: 'create-ticket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})

export class CreateTicketComponent extends BaseFormComponent implements OnInit {
  editor!: Editor;
  currentUser$: Observable<CurrentUser | null>;
  assignableUsers$: Observable<OptionItem[]>;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>,
    private apiService: ApiService, private router: Router) {
    super();

    this.currentUser$ = store.select(selectCurrentUser);
    this.assignableUsers$ = store.select(selectAssignableUsers);
  }

  onSubmit() {
    if (!super.beforeSubmit()) return;

    this.apiService.createTicket(this.form.value)
      .pipe(first()).subscribe(
        result => {
          this.router.navigate(['/ticket-list']);
          this.saving = false;
        },
        error => {
          this.saving = false;
          alert('There was an error creating the ticket: ' + error)
        }
      );
  }

  cancelAndReturn() {
    if (this.form.dirty && !confirm("Are you sure you wish to cancel?")) return;

    this.router.navigate(['ticket-list'])
  }

  ngOnInit() {
    this.editor = new Editor();

    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required]],
      assignedToId: [null]
    });
  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}

