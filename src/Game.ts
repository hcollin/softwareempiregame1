import { Ctx, Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import createDeck, { createCards, deckShuffle } from "./gameComponents/Deck";
import { getAllEmployeeCards } from "./gameComponents/EmployeeDeck";
import { initializePlayerPublic, initializePlayerSecret } from "./gameComponents/Players";
import { getAllProjectCards, initProjectLeads } from "./gameComponents/ProjectDeck";
import { GameState } from "./models/GameModels";
import { addNewProjectLeadMove, discardEmplyeeCard, drawSingleEmplyeeCardToHand } from "./moves/PlayPhase";

export const SoftwareGame: Game<GameState> = {
	name: "Software_Empires",

	minPlayers: 2,
	maxPlayers: 4,

	setup: (ctx: Ctx): GameState => {
		const NG: GameState = {
			employeeDeck: getAllEmployeeCards(ctx),
			projectDeck: getAllProjectCards(ctx),
			resourceDeck: [],
			projectLeads: [],
			playerBoards: [],
			playerSecrets: [],
		};

		initProjectLeads(NG, ctx);

		ctx.playOrder.map((id: string) => {
			const secretState = initializePlayerSecret(NG, ctx, id);
			NG.playerSecrets.push(secretState);
			const publicState = initializePlayerPublic(NG, ctx, id);
			NG.playerBoards.push(publicState);
		});

		return NG;
	},

	phases: {
		play: {
			start: true,
			moves: {
				drawSingleEmplyeeCardToHand,
				discardEmplyeeCard,
				addNewProjectLeadMove
			},
		},
		score: {},
		resolve: {},
	},

	turn: {},

	moves: {},

	endIf: (G, ctx) => {},
};
