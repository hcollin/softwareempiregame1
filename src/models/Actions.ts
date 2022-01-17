import { EmployeeCardActionModel } from "./CardModels";
import { Card } from "./DeckModels";

export interface Action {
    actionCode?: string;
	sourceCard?: Card;
	target?: string|null;
    cardOptions?: Card[];
    cardAction?: EmployeeCardActionModel;
    tokenValue?: number
    options?: any;
}

export enum ActionSlotType {
    MANAGEMENT = "Management",
    SALES = "Sales",
    ACTIVEPROJECT = "ActiveProject",
    RESOURCE = "Resource"
}