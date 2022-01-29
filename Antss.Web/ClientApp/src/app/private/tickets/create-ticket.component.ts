import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStoreService } from "@core/app.store.service";
import { debounceTime, distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { ApiService } from '@core/api.service';
import { Editor } from 'ngx-editor';
import { BaseFormComponent } from '@app/core/base-components/base-form-component';
import { OptionItem } from '../../core/models/option-item';
import { Observable, OperatorFunction } from 'rxjs';

@Component({
  selector: 'create-ticket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-ticket.component.html'
})

export class CreateTicketComponent extends BaseFormComponent implements OnInit {
  editor!: Editor;

  selectedUser!: OptionItem;
  allUsers: OptionItem[] = [];
  filteredUsers: OptionItem[] = [];

  constructor(private formBuilder: FormBuilder, public appStoreService: AppStoreService,
    private apiService: ApiService, private router: Router) {
    super();
  }

  formatter = (optionItem: OptionItem) => optionItem.label;

  search: OperatorFunction<string, readonly { value: number, label: string }[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.allUsers.filter(optionItem => new RegExp(term, 'mi').test(optionItem.label)).slice(0, 10))
  )

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

    this.appStoreService.assignableUsers$.subscribe(x => this.allUsers = x);

    this.form = this.formBuilder.group({
      description: ['', [Validators.required]],
      assignedToId: [null]
    });
  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}

