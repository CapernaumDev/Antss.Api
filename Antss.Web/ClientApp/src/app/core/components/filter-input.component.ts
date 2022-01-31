import { Component, Input, HostListener } from "@angular/core";
import { FilterSourceDirective } from "@app/core/directives/filter-source.directive";

@Component({
  selector: "[filterInput]",
  template: `
    <input (input)="filterUpdated($event)"/>
  `
})

export class FilterInputComponent {
  filterUpdated(event: any) {
    let value = (event?.currentTarget as HTMLInputElement)?.value;
    console.log('FilterSourceComponeent filterUpdated' + value);
    this.filter.filter(value);
  }

  constructor(public filter: FilterSourceDirective) {}
}