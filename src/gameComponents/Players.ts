import { Ctx } from "boardgame.io";
import { EmployeeCardModel } from "../models/CardModels";
import { GameState, PublicPlayerState, SecretPlayerState } from "../models/GameModels";
import { drawFounderCards, getCeoCard } from "./EmployeeDeck";

export function initializePlayerSecret(G: GameState, ctx: Ctx, playerId: string): SecretPlayerState {
	const initialCards: EmployeeCardModel[] = [];
	initialCards.push(getCeoCard(playerId));

	const founders = drawFounderCards(G, ctx, 3);

	return {
		hand: initialCards.concat(founders),
		playerId: playerId,
	};
}

export function initializePlayerPublic(G: GameState, ctx: Ctx, playerId: string): PublicPlayerState {
	return {
		playerId: playerId,
		activeProjects: [],
		activeResources: [],
		points: 20,
	};
}

export function getCurrentPlayerSecrectState(G: GameState, ctx: Ctx): SecretPlayerState | null {
	const pid = ctx.currentPlayer;
	if (!pid) return null;

	const st = G.playerSecrets.find((s: SecretPlayerState) => s.playerId === pid);
	return st || null;
}
