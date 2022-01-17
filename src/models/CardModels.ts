import { ActionSlotType } from "./Actions";
import { Card } from "./DeckModels";

export interface ProjectCardModel extends Card {
	vps: number;
	time: number;
	size: number;
	industry: string;
	keywords: string[];
	rules?: string[];
}

export interface ProjectLead {
	project: ProjectCardModel;
	timeTokens: number;
	bids: { card: EmployeeCardModel; tokens: number }[];
}

export interface ActiveProjectCardModel extends ProjectCardModel {}

export interface EmployeeCardModel extends Card {
	stars: number;
	founder: boolean;
	keywords: string[];
	rules: string[];
	title?: string;
	actions: EmployeeCardActionModel[];

}


export enum EmployeeCardActionType {
	
	// Assign to active project (Not stored into the actual actions array in the card)
	CODE = "Code",

	// Recruit more people
	RECRUIT = "Recruit",

	// Fire People
	FIRE = "Fire",

	// Bid for new Projects
	BID = "Bid",

	// Acquire resources
	ACQUIRE = "Acquire",	
}
export interface EmployeeCardActionModel {
	actionSlotType: ActionSlotType;
	type: [EmployeeCardActionType, number];
	text: string;
}




export interface ResourceCardModel extends Card {}
