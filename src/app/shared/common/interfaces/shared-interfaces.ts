import { DrugItem } from 'src/app/core/common/interfaces';

export interface BreadCrumb {
  label: string;
  url: string;
  icon?: string;
}

export interface TableColumn {
  name: string;
  dataKey: string;
  showCustomTemplateCell?: boolean;
  hideDefaultCell?: boolean;
}

export interface RowActionWithData<Action, Data extends TableData> {
  action: Action;
  data: Data;
  index : number
}

export interface TableButtonSettings<ButtonAction> {
  title: string;
  actionToPerform?: ButtonAction;
  class?: string[];
  icon?: string;
  iconClass?: string;
}

export interface TableData {
  className?: string;
}

export interface BaseTablePage<TableButtonActionType, Data extends TableData> {
  tableData: Data[];
  tableButtons?: TableButtonSettings<TableButtonActionType>[];
  tableColumns: TableColumn[];
  initializeTableColumns: () => void;
  onActionClicked?: (
    action: RowActionWithData<TableButtonActionType, Data>
  ) => void;
  initializeTableButtons?: () => void;
}

export interface CreateOrderForm {
  drug: DrugItem;
  quantity: number;
}
