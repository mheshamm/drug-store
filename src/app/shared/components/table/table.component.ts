import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RowActionWithData, TableButtonSettings, TableColumn, TableData } from '../../common/interfaces';


@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    // modules
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatSortModule,
    MatIconModule,
  ],
})
export class TableComponent<T extends TableData, ButtonAction> implements OnInit, OnChanges {
  tableDataSource = new MatTableDataSource([]);

  displayedColumns: string[];

  buttonColumn: string;

  // inputs

  @Input() set tableData(data: T[]) {
    this.setTableDataSource(data);
  }
  @Input() tableColumns: TableColumn[];
  @Input() customCellTemplate: TemplateRef<any>;
  @Input() buttons: TableButtonSettings<ButtonAction>[] = [];

  // outputs
  @Output() rowActionData: EventEmitter<RowActionWithData<ButtonAction, T>> =
    new EventEmitter<RowActionWithData<ButtonAction, T>>();

  // constructor
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    // setup columns name
    if (changes && changes['tableColumns']) {
      this.setTableColumnsName();
    }
    // setup table buttons column
    if (changes && changes['buttons']) {
      this.setupButtonsColumn();

    }
  }
  ngOnInit(): void {}

  // publics

  onRowActionClicked(action: ButtonAction, element: T , index : number): void {
    const rowActionWithData: RowActionWithData<ButtonAction, T> = {
      action: action,
      data: element,
      index : index
    };
    this.rowActionData.emit(rowActionWithData);
  }

  // privates

  private setTableDataSource(data: T[]): void {
    this.tableDataSource = new MatTableDataSource<T>(data);
  }

  private setTableColumnsName(): void {
    this.displayedColumns = this.tableColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
    console.log(this.displayedColumns);

  }

  private setupButtonsColumn(): void {
    this.buttonColumn = 'Actions'
    if (this.buttons.length > 0) {
      this.displayedColumns = [...this.displayedColumns, this.buttonColumn];
    }
  }
}
