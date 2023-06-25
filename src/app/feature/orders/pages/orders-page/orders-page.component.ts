import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseTablePage,
  CreateOrderForm,
  RowActionWithData,
  TableButtonSettings,
  TableColumn,
} from 'src/app/shared/common/interfaces';
import { Order } from 'src/app/core/common';
import { CreateOrderTableAction } from 'src/app/shared/common/enums';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CreateOrderComponent } from '../../components/create-order/create-order.component';
import { DrugsRepository } from '../../../../core/repository/drug-repository';
import { DrugItem } from 'src/app/core/common/interfaces';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, TableComponent, CreateOrderComponent],
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent
  implements OnInit, BaseTablePage<CreateOrderTableAction, Order>
{
  tableData: Order[] = [];
  tableButtons?: TableButtonSettings<CreateOrderTableAction>[] = [];
  tableColumns: TableColumn[] = [];



  constructor(private drugsRepository : DrugsRepository) {}

  ngOnInit(): void {
    this.initializeTableColumns();
    this.initializeTableButtons();
  }

  // publics

  onActionClicked(
    action: RowActionWithData<CreateOrderTableAction, Order>
  ) {
    console.log(action);

    switch(action.action){
      case CreateOrderTableAction.DELETE :{
        this.resetDataAfterDelete(action.data , action.index)
      }
    }
  }
  onGetOrder(orderData: CreateOrderForm) {
    const order = this.tableData.find(item=>item.id = orderData.drug.id);
    if(order || orderData.quantity > orderData.drug.quantity){
      this.showInvalidMsg(orderData)
    }else {
      this.tableData = [...this.tableData , {
        ...orderData.drug,
        quantity: orderData.quantity,
        totalPrice: orderData.drug.price * orderData.quantity,
      } ];
      this.checkQuantityOfDrugsIsValid(orderData.drug)
    }


  }
  initializeTableButtons(): void {
    this.tableButtons = [
      {
        title: 'Delete',
        icon: 'delete',
        actionToPerform : CreateOrderTableAction.DELETE,
        class: [
          'bg-red-500',
          'h-[40px]',
          'text-white',
          'rounded-sm',
          'border-0',
        ],
      },
      {
        title: 'Update',
        icon: 'edit',
        actionToPerform : CreateOrderTableAction.UPDATE,
        class: [
          'bg-green-500',
          'h-[40px]',
          'text-white',
          'rounded-sm',
          'border-0',
        ],
      },
    ];
  }
  initializeTableColumns(): void {
    this.tableColumns = [
      {
        dataKey: 'id',
        name: 'Drug Id',
      },
      {
        dataKey: 'name',
        name: 'Drug Name',
      },
      {
        dataKey: 'quantity',
        name: 'Quantity',
      },
      {
        dataKey: 'status',
        name: 'Drug Status',
      },
      {
        dataKey: 'expiration',
        name: 'Expire Date',
      },
      {
        dataKey: 'price',
        name: 'Price Per Unit',
      },
      {
        dataKey: 'totalPrice',
        name: 'Total Price',
      },
    ];
  }

  // privates
  private resetDataAfterDelete(order : Order , orderIndex : number ):void {
    this.drugsRepository.drugsItems = this.drugsRepository.drugsItems.map(drug=>{
      if(drug.id == order.id){
        drug.quantity = order.quantity + drug.quantity;
      }
      return drug
    })
    this.tableData = this.tableData.filter((item , i)=>i !== orderIndex)
  }
  private checkQuantityOfDrugsIsValid(drugOrder : DrugItem): void {
    this.drugsRepository.drugsItems.map((drug) => {
      if (drug.id == drugOrder.id) {
        if (drug.quantity >= drugOrder.quantity) {
          drug.quantity = drug.quantity - drugOrder.quantity;
        }
      }
      return drug;
    });
  }

  private showInvalidMsg(orderData : CreateOrderForm):void{
    window.alert('Invalid');
    this.tableData = [...this.tableData , {
      ...orderData.drug,
      quantity: orderData.quantity,
      totalPrice: orderData.drug.price * orderData.quantity,
      className :  'bg-red-400'
    } ]
    const index = this.tableData.length-1;
    console.log(index);

    setTimeout(() => {
      this.tableData = this.tableData.filter((item , i)=>i !== index)
    }, 3000);
  }
}
