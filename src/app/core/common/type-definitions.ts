import { TableData } from "src/app/shared/common/interfaces";
import { DrugItem } from "./interfaces";

export type Order = DrugItem & TableData & {totalPrice : number , orderCount? : number};
