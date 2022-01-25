import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Office } from '@core/models/office';
import { AppStoreService } from "@core/app.store.service";
import { first } from 'rxjs/operators';
import { ApiService } from '@core/api.service';

@Component({
  selector: 'create-ticket',
  templateUrl: './create-ticket.component.html'
})

export class CreateTicketComponent implements OnInit {
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

    // if submitted
    // create ticket
    // route to ticket list page
    // on error, log and alert

  }
  ngOnInit() {
    // do things on init
  }
}

