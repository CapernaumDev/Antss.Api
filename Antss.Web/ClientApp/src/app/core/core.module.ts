import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from '@core/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { BaseFormComponent } from './base-components/base-form-component';
import { PreventDoubleSubmitDirective } from './directives/prevent-double-submit.directive';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteFormControl } from './form-controls/autocomplete-form-control';

@NgModule({
  declarations: [
    NavMenuComponent,
    BaseFormComponent,
    PreventDoubleSubmitDirective,
    AutocompleteFormControl
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    NgbTypeaheadModule
  ],
  exports: [
    NavMenuComponent,
    BaseFormComponent,
    PreventDoubleSubmitDirective,
    AutocompleteFormControl
  ]
})

export class CoreModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faUserCircle);
  }
}
