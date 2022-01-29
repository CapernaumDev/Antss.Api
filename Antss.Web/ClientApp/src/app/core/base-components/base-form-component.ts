import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    template: ''
})

export class BaseFormComponent {
    saving = false;
    submitted = false;
    registerForm!: FormGroup;
    
  get f() { return this.registerForm.controls; }

  beforeSubmit() : boolean {
    this.submitted = true;
    if (this.saving) return false;
    this.saving = true;

    if (this.registerForm.invalid) {
      this.saving = false;
      return false;
    }
    return true;
  }
}
