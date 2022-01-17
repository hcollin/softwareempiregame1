import { ActiveProjectCardModel, EmployeeCardModel, ProjectLead, ProjectCardModel, ResourceCardModel } from "./CardModels";
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
	playedManagementCards: EmployeeCardModel[];
}

export interface SecretPlayerState {
	playerId: string;
	hand: Card[];
}
