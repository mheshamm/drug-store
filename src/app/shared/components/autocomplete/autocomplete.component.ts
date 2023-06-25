import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropDownModel } from 'src/app/core/common/interfaces';
import { SearchFilterPipe } from '../../pipes';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SearchFilterPipe,
    MatInputModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent<T extends DropDownModel>
  implements OnInit, ControlValueAccessor
{
  form!: FormGroup;
  onChanged = (value: string) => {};
  onTouched: any;
  filteredOptions: Observable<T[]>;

  // inputs
  @Input() data: T[] = [{ dropDownDisplayedName: 's', id: 1 }] as any;
  @Input() label: string;
  @Input() placeholder: string = 'Search';

  // getters
  get search(): AbstractControl {
    return this.form.get('search');
  }
  constructor() {}
  // control value accessor
  writeValue(value: string): void {
    this.search.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.search.disable();
    } else {
      this.search.enable();
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  // publics
  onInput(event: Event): void {
    this.onChanged(event.target?.['value']);
  }
  onTouchInput(event: Event): void {
    this.onTouched();
  }
  getOptionText(option) {
    console.log(option, 's');
    if (option) {
      return option.dropDownDisplayedName;
    }
  }
  onSelectOption(event : MatAutocompleteSelectedEvent) : void{
    this.onChanged(event.option.value)
  }

  // privates
  private initializeForm(): void {
    this.form = new FormGroup({
      search: new FormControl(),
    });
  }
  private _filter(value: T | string): T[] {
    if (typeof value == 'string') {
      return this.data.filter((option) =>
        option.dropDownDisplayedName.toLowerCase().includes(value)
      );
    } else {
      return this.data.filter((option) =>
        option.dropDownDisplayedName
          .toLowerCase()
          .includes(value.dropDownDisplayedName)
      );
    }
  }
}
