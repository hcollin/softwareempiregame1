import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC } from "react";
import { getCurrentPlayerSecrectState } from "../gameComponents/Players";
import { GameState } from "../models/GameModels";
import { ActionButton } from "./common/ActionButton";

import svgArrow from "./arrowRight.svg";

import "./actionDisplay.scss";

export const ActionDisplay: FC<BoardProps<GameState>> = (props) => {
	const state = getCurrentPlayerSecrectState(props.G, props.ctx);
	if (!state) return null;

	const action = state.action;

	if (!action) return null;

	function cancel() {
		props.undo();
		// props.moves.cancelCardPlayAction();
	}

	return (
		<div className="actionDisplay">
			<ActionButton icon="cancel" style="NEGATIVE" onClick={cancel}>
				UNDO
			</ActionButton>

			{action.sourceCard && (
				<div>
					<img src={svgArrow} alt="arrow to right" />
					Playing card: <b>{action.sourceCard.name}</b>
				</div>
			)}

			{action.actionCode && (
				<div>
					<img src={svgArrow} alt="arrow to right" /> for action: <b>{action.actionCode}</b>
				</div>
			)}
		</div>
	);
};
