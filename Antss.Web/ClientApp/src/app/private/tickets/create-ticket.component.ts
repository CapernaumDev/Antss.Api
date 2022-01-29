import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStoreService } from "@core/app.store.service";
import { first } from 'rxjs/operators';
import { ApiService } from '@core/api.service';
import { Editor } from 'ngx-editor';
import { BaseFormComponent } from '@app/core/base-components/base-form-component';

@Component({
  selector: 'create-ticket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-ticket.component.html'
})

export class CreateTicketComponent extends BaseFormComponent implements OnInit {
  editor!: Editor;

  constructor(private formBuilder: FormBuilder, public appStoreService: AppStoreService,
    private apiService: ApiService, private router: Router) {
    super();
  }

  onSubmit() {
    if (!super.beforeSubmit()) return;

    this.apiService.createTicket(this.registerForm.value)
      .pipe(first()).subscribe(
        result => {
          this.router.navigate(['/ticket-list']);
          this.saving = false;
        },
        error => {
          this.saving = false;
          console.error(error);
          alert('There was an error creating the ticket: ' + error)
        }
      );
  }

  cancelAndReturn() {
    if (this.registerForm.dirty && !confirm("Are you sure you wish to cancel?")) return;

    this.router.navigate(['ticket-list'])
  }

  ngOnInit() {
    this.editor = new Editor();

    this.registerForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      assignedToId: [null]
    });
  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}

