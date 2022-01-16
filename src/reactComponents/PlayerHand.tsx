import { Ctx } from "boardgame.io";
import { FC } from "react";
import { EmployeeCardModel } from "../models/CardModels";
import { Card, CardType } from "../models/DeckModels";
import { GameState, SecretPlayerState } from "../models/GameModels";
import { EmployeeCardComponent } from "./Cards/EmployeeCard";

import "./playerHand.css";

interface PlayerHand {
	G: GameState;
	ctx: Ctx;
	moves: Record<string, (...args: any[]) => void>;
	playerId: string | null;
}

export const PlayerHand: FC<PlayerHand> = (props) => {
	const myState = props.G.playerSecrets.find((st: SecretPlayerState) => st.playerId === props.playerId);

	function handleClick(c: Card) {
		props.moves.discardEmplyeeCard(c);
	}

	if (!myState) return null;


    const rowClass = `rows-${Math.ceil(myState.hand.length / 8)}`;

	return (
		<div className={`playerHandContainer ${rowClass}`}>
			{myState.hand.map((c: Card) => {
				if(c.type === CardType.EMPLOYEE) {
                    return <EmployeeCardComponent key={c.id} card={c as EmployeeCardModel} onClick={() => {}} />;
                }
                return (
					<div className="card" key={c.id} onClick={() => handleClick(c)}>
						{c.name}
					</div>
				);
			})}
		</div>
	);
};
 