import { Ctx } from "boardgame.io";
import { deckDiscard, deckDraw } from "../gameComponents/Deck";
import { getCurrentPlayerSecrectState } from "../gameComponents/Players";
import { addNewProjectLead } from "../gameComponents/ProjectDeck";
import { EmployeeCardModel, ProjectCardModel } from "../models/CardModels";
import { Card } from "../models/DeckModels";
import { GameState } from "../models/GameModels";

export function drawSingleEmplyeeCardToHand(G: GameState, ctx: Ctx) {
	const state = getCurrentPlayerSecrectState(G, ctx);
	if (!state) return;
	const [cards, deck] = deckDraw<EmployeeCardModel>(G.employeeDeck, 1);

	if (state) {
		state.hand = state.hand.concat(cards);
	}
}

export function discardEmplyeeCard(G: GameState, ctx: Ctx, card: EmployeeCardModel) {
	const state = getCurrentPlayerSecrectState(G, ctx);
	if (!state) return;
	state.hand = state.hand.filter((c: Card) => c.id !== card.id);
	const nd = deckDiscard(G.employeeDeck, [card]);
}


export function addNewProjectLeadMove(G: GameState, ctx: Ctx) {
    if(G.projectDeck.deck.length <= 0) return;
    const [c, nd] = deckDraw<ProjectCardModel>(G.projectDeck, 1);
    G.projectDeck = nd;
    
    addNewProjectLead(G, ctx, c);
}