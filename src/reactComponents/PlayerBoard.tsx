import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC } from "react";
import { getCurrentPlayerPublictState, getCurrentPlayerSecrectState } from "../gameComponents/Players";
import { ActionSlotType } from "../models/Actions";
import { EmployeeCardActionModel, EmployeeCardActionType, EmployeeCardModel } from "../models/CardModels";
import { CardType } from "../models/DeckModels";
import { GameState, ManagementSlot } from "../models/GameModels";
import { EmployeeCardComponent } from "./Cards/EmployeeCard";
import { CardSlots, FreeSlot } from "./CardSlots";

import "./playerBoard.css";

export const PlayerBoard: FC<BoardProps<GameState>> = (props) => {
	const state = getCurrentPlayerPublictState(props.G, props.ctx);

	if (state === null) return null;

	const managementCards: Array<ManagementSlot | null> = [...state.playedManagementCards];

	while (managementCards.length < 3) {
		managementCards.push(null);
	}

	return (
		<div className="playerBoard shadowline">
			<h2 className="title">Player Board</h2>
			<div className="resources">
				<label>Resources</label>
				{state.activeResources.length === 0 && <p className="notice">No resources.</p>}
			</div>
			<div className="activeProjects">
				<label>Active Projects</label>
				{state.activeProjects.length === 0 && <p className="notice">No active projects at the moment. Win something from the project leads!</p>}
			</div>
			<div className="managementCards">
				<label>Management Cards</label>

				<CardSlots>
					{managementCards.map((ms: ManagementSlot | null, i: number) => {
						if (ms !== null) return <EmployeeCardComponent card={ms.card} key={ms.card.id} onClick={() => {}} />;
						return <FreeManagementSlot key={`freeProjectSlot-${i}`} {...props}></FreeManagementSlot>;
					})}
				</CardSlots>
			</div>
		</div>
	);
};

const FreeManagementSlot: FC<BoardProps<GameState>> = (props) => {
	const secret = getCurrentPlayerSecrectState(props.G, props.ctx);

	if (!secret) return null;

	const action = secret.action;

	let cardActions: EmployeeCardActionModel[] = [];

	if (action && action.sourceCard && action.sourceCard.type === CardType.EMPLOYEE) {
		const card = action.sourceCard as EmployeeCardModel;
		cardActions = card.actions.filter((am: EmployeeCardActionModel) => am.actionSlotType === ActionSlotType.MANAGEMENT);
	}

	function triggerAction(ea: EmployeeCardActionModel) {
		if (ea.type[0] === EmployeeCardActionType.RECRUIT && action && action.sourceCard) {
			props.moves.mngtSelectRecruitAction();
		}
	}

	return (
		<FreeSlot className="freeSlotActions">
			{action &&
				cardActions.length > 0 &&
				cardActions.map((act: EmployeeCardActionModel) => <button onClick={() => triggerAction(act)}>{act.text}</button>)}
			{!action && <p>Select card with management action</p>}
		</FreeSlot>
	);
};
