import { Ctx } from "boardgame.io";
import { GameState } from "../models/GameModels";
import { getCurrentAction } from "./Players";

export function getMaximumRecruitmentStars(G: GameState, ctx: Ctx): number {
	const action = getCurrentAction(G, ctx);
	if (!action || !action.cardAction) return 0;
	return action.cardAction.type[1];
}
