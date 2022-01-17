import { Action } from "./Actions";
import { ActiveProjectCardModel, EmployeeCardModel, ProjectLead, ProjectCardModel, ResourceCardModel, EmployeeCardActionModel } from "./CardModels";
import { Deck, Card } from "./DeckModels";

export interface GameState {
	employeeDeck: Deck<EmployeeCardModel>;
	projectDeck: Deck<ProjectCardModel>;
	resourceDeck: string[];
	projectLeads: ProjectLead[];
	playerBoards: PublicPlayerState[];
	playerSecrets: SecretPlayerState[];
	playersDone: string[];
}

export interface PublicPlayerState {
	playerId: string;
	points: number;
	activeProjects: ActiveProjectCardModel[];
	activeResources: ResourceCardModel[];
	playedManagementCards: (ManagementSlot | null)[];
}

export interface ManagementSlot {
	card: EmployeeCardModel;
	action: EmployeeCardActionModel;
}

export interface SecretPlayerState {
	playerId: string;
	hand: Card[];
	activeCard: Card | null;
	action: Action | null;
}

export enum PlayPhaseStages {
	IDLE = "idle",
	ACTION = "selectAction",
	TARGET = "selectTarget",
	END = "end",
}
