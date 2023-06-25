import { DrugAvailability } from '../enums';

export interface DropDownModel {
  dropDownDisplayedName: string;
}

export interface DrugItem extends DropDownModel {
  id: number;
  name: string;
  quantity: number;
  status?: DrugAvailability;
  expiration: string;
  price: number;
  currency: string;
}
