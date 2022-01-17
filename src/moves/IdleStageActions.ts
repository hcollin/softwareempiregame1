import { Ctx } from "boardgame.io";
import { getCurrentPlayerSecrectState } from "../gameComponents/Players";
import { EmployeeCardModel } from "../models/CardModels";
import { GameState, PlayPhaseStages } from "../models/GameModels";

export function playCardFromHandAction(G: GameState, ctx: Ctx, card: EmployeeCardModel) {
	const state = getCurrentPlayerSecrectState(G, ctx);

	if (state) {
		state.action = {
			sourceCard: card
		}
	}

	ctx.events?.setStage(PlayPhaseStages.ACTION);
}

export function cancelCardPlayAction(G: GameState, ctx: Ctx) {
	const state = getCurrentPlayerSecrectState(G, ctx);
	if (state) {
		state.action = null;
	}

	ctx.events?.setStage(PlayPhaseStages.IDLE);

}

export function endTurnAction(G: GameState, ctx: Ctx, playerId: string) {
	const pid = ctx.currentPlayer;
	if (!G.playersDone.includes(playerId)) {
		G.playersDone.push(playerId);
	}
	ctx.events?.setStage(PlayPhaseStages.END);
}
