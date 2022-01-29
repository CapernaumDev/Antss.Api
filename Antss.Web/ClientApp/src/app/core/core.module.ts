import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from '@core/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { BaseFormComponent } from './base-components/base-form-component';
import { PreventDoubleSubmitDirective } from './directives/prevent-double-submit.directive';

@NgModule({
  declarations: [
    NavMenuComponent,
    BaseFormComponent,
    PreventDoubleSubmitDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    NavMenuComponent,
    BaseFormComponent,
    PreventDoubleSubmitDirective
  ]
})

export class CoreModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faUserCircle);
  }
}
