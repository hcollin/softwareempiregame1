import { Ctx } from "boardgame.io";
import { deckDiscard, deckDraw } from "../gameComponents/Deck";
import { getCurrentPlayerPublictState, getCurrentPlayerSecrectState } from "../gameComponents/Players";
import { getMaximumRecruitmentStars } from "../gameComponents/recruitmentRules";
import { EmployeeCardActionModel, EmployeeCardActionType, EmployeeCardModel } from "../models/CardModels";
import { Card, CardType } from "../models/DeckModels";
import { GameState, PlayPhaseStages } from "../models/GameModels";

export function mngtSelectRecruitAction(G: GameState, ctx: Ctx) {
	const sState = getCurrentPlayerSecrectState(G, ctx);
	const pState = getCurrentPlayerPublictState(G, ctx);

	if (!sState || !pState) return;

    if(!sState.action) return;

	const card = sState.action?.sourceCard as EmployeeCardModel;

	if (!card) return;

	const act = card.actions.find((ecam: EmployeeCardActionModel) => ecam.type[0] === EmployeeCardActionType.RECRUIT);

	if (!act) return;

	pState.playedManagementCards.push({
		card: card,
		action: act,
	});

	sState.hand = sState.hand.filter((c: Card) => c.id !== card.id);

    sState.action.actionCode = act.type[0];
    
    const [emps, nd] = deckDraw(G.employeeDeck, 4);
    G.employeeDeck = nd;
    sState.action.cardOptions = emps;
    sState.action.cardAction = act;
}

export function mngtConfirmRecruitAction(G: GameState, ctx: Ctx, cards: EmployeeCardModel[]) {
    const sState = getCurrentPlayerSecrectState(G, ctx);
	const pState = getCurrentPlayerPublictState(G, ctx);

	if (!sState || !pState) return;

    if(!sState.action || !sState.action.cardOptions) return;

    const maxStars = getMaximumRecruitmentStars(G, ctx);

    const stars = cards.reduce((tot: number, c: Card) => {
        if (c.type !== CardType.EMPLOYEE) return tot;

        const ec = c as EmployeeCardModel;
        return tot + ec.stars;
    }, 0);

    if(stars > maxStars) {
        throw new Error("TOO EXPENSIVE!");
    }

    // Add recruited cards to hand
    sState.hand = sState.hand.concat(cards);

    // Discard rest of the shown cards
    const toDiscard = sState.action.cardOptions.filter((oc: Card) => {
        if(cards.find((sc: Card) => sc.id === oc.id)) {
            return false;
        }
        return true;
    }) as EmployeeCardModel[];
    console.log(toDiscard, cards);
    
    deckDiscard(G.employeeDeck, toDiscard);


    sState.action = null;
    ctx.events?.setStage(PlayPhaseStages.IDLE);




}

export function mngtFireEmployeeAction(G: GameState, ctx: Ctx, card: EmployeeCardModel) {


}
