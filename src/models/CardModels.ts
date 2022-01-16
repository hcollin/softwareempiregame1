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

export interface EmployeeCardActionModel {
	type: [string, number];
	text: string;

}

export interface ResourceCardModel extends Card {}
