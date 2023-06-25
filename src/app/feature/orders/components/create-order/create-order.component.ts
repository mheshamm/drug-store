import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from 'src/app/shared/components/autocomplete/autocomplete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateOrderForm, TableColumn } from 'src/app/shared/common/interfaces';
import { DrugItem } from 'src/app/core/common/interfaces';
import { DrugsRepository } from '../../../../core/repository/drug-repository';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    TableComponent,
  ],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  form!: FormGroup;
  data: DrugItem[];
  @Output() addOrder: EventEmitter<CreateOrderForm> = new EventEmitter();

  constructor(private drugsRepository: DrugsRepository) {}

  ngOnInit(): void {
    this.initializeForm();
    this.data = this.drugsRepository.drugsItems.map((drug) => {
      drug.dropDownDisplayedName = drug.name;
      return drug;
    });
  }
  onCreateOrder(): void {
    this.addOrder.emit(this.form.value);
    this.form.reset();
  }

  // privates
  private initializeForm(): void {
    this.form = new FormGroup({
      drug: new FormControl(),
      quantity: new FormControl(),
    });
  }


}
