import { Injectable } from '@angular/core';
import { DrugItem } from '../common/interfaces';
import drugs from "../../../assets/data/mocked-data.json"
@Injectable({
  providedIn: 'root',
})
export class DrugsRepository {
  public drugsItems : DrugItem[] = drugs.drugs as DrugItem[] ;
  constructor() {
  }




}
