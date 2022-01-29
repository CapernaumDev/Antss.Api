import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStoreService } from "@core/app.store.service";
import { first } from 'rxjs/operators';
import { ApiService } from '@core/api.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'create-ticket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-ticket.component.html'
})

export class CreateTicketComponent implements OnInit {
  submitted = false;
  registerForm!: FormGroup;
  editor!: Editor;
  html!: '';

  constructor(private formBuilder: FormBuilder, public appStoreService: AppStoreService,
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

