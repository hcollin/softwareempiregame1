import { Ctx } from "boardgame.io";
import { FC } from "react";
import { GameState } from "../models/GameModels";
import { DeckComponent } from "./Deck";

interface DeckProps {
	G: GameState;
	ctx: Ctx;
	moves: Record<string, (...args: any[]) => void>;
	playerId: string | null;
}

export const EmployeeDeck: FC<DeckProps> = (props) => {
	const edeck = props.G.employeeDeck;

	function drawFromDeck() {
		// props.moves.drawSingleEmplyeeCardToHand();
	}

	return (
		<div className="shadowline">
			<h2 className="title">Employees Deck</h2>
			<DeckComponent deck={edeck} G={props.G} ctx={props.ctx} playerId={props.playerId} onDrawFromDeck={drawFromDeck} />
		</div>
	);
};
