
export enum CardType {
    EMPLOYEE = "Employee",
    PROJECT = "Project",
    RESOURCE = "Resource"
}


export interface Card {
	id: string;
	isFaceDown: boolean;
	name: string;
    type: CardType;
    cardback?: string;
}

export interface Deck<T extends Card> {
    name: string;
    cardback: string;
	deck: T[];
	discard: T[];
}
