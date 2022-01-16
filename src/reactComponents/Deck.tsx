import { Ctx } from "boardgame.io";
import { FC } from "react";
import { EmployeeCardModel } from "../models/CardModels";
import { Card, Deck } from "../models/DeckModels";
import { GameState } from "../models/GameModels";

import "./deck.css";

interface DeckProps<T extends Card> {
	deck: Deck<T>;
	G: GameState;
	ctx: Ctx;
    // moves: Record<string, (...args: any[]) => void>;
	playerId: string | null;

    onDrawFromDeck?: () => void;
    onSelectFromDeck?: (c: Card) => void;
    onSelectFromDiscard?: (c: Card) => void;
}

export const DeckComponent: FC<DeckProps<Card>> = (props) => {
	
    function drawCard() {
        // props.moves.drawSingleEmplyeeCardToHand();
        if(props.onDrawFromDeck) {
            props.onDrawFromDeck();
        }
    }

	function showDiscard() {

    }

    const name = props.deck.name || "Deck";

	return (
		<div className="deckContainer">
			<div className="box">
				<label>{name}</label>
                <div className="cardContainer deck" onClick={drawCard}>
                    <img src={props.deck.cardback} alt="" className="cardback" />
                    <div className="counter">
                        {props.deck.deck.length}
                    </div>
                </div>
			</div>
			<div className="box">
				<label>Discard</label>
                <div className="cardContainer discard">
                <div className="counter">
                        {props.deck.discard.length}
                    </div>
                </div>
			</div>

			
		</div>
	);
};
