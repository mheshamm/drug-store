import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CreateOrderComponent } from 'src/app/feature/orders/components/create-order/create-order.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent, ReactiveFormsModule , CreateOrderComponent],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  form!: FormGroup;
  data = [{dropDownDisplayedName : 'sss' , id : 1} , {dropDownDisplayedName : 'sssa' , id : 2}]
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(),
    });
    this.form.valueChanges.subscribe(console.log);
  }
}
