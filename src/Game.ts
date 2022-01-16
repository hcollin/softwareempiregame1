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

// Return true if `cells` is in a winning configuration.
function IsVictory(cells: string[]) {
	const positions: Array<Array<number>> = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const isRowComplete = (row: Array<number>) => {
		const symbols = row.map((i) => cells[i]);
		return symbols.every((i) => i !== null && i === symbols[0]);
	};

	return positions.map(isRowComplete).some((i) => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells: string[]) {
	return cells.filter((c) => c === null).length === 0;
}
