import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';
import { OptionItem } from '../models/option-item';

@Component({
  selector: 'autocomplete-form-control',
  templateUrl: "autocomplete-form-control.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutocompleteFormControl
    }
  ]
})

// Makes ngbTypeahead available as a formcontrol with OptionItem as available options
// TODO: full implementation of formcontrol validation etc
export class AutocompleteFormControl implements ControlValueAccessor, OnInit {

  @ViewChild('inputElement') input!: HTMLElement;

  @Input() optionItems!: Observable<OptionItem[]>;
  @Input() elementId!: string;

  selectedItem!: OptionItem;
  allItems: OptionItem[] = [];

  onChange = (selectedValue: number) => { };
  onTouched = () => { };
  touched = false;
  disabled = false;

  formatter = (optionItem: OptionItem) => optionItem.label;

  search: OperatorFunction<string, readonly { value: number, label: string }[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.allItems.filter((optionItem: { label: string; }) => new RegExp(term, 'mi').test(optionItem.label)).slice(0, 10))
  )

  ngOnInit(): void {
    this.optionItems.subscribe(x => this.allItems = x);
  }

  onSelect($event: any, input: any) {
    this.markAsTouched();
    if (!this.disabled) {
      $event.preventDefault();
      this.selectedItem = $event.item;
      input.value = '';

      this.onChange(this.selectedItem.value);
    }
  }

  writeValue(optionItem: OptionItem) {
    this.selectedItem = optionItem;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
