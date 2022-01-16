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

export const ProjectDeck: FC<DeckProps> = (props) => {
	const pdeck = props.G.projectDeck;

    function drawFromDeck() {
        props.moves.addNewProjectLeadMove();
    }

	return <DeckComponent deck={pdeck} G={props.G} ctx={props.ctx} playerId={props.playerId} onDrawFromDeck={drawFromDeck} />;
};
