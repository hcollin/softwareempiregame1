import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { Card } from "./models/DeckModels";

import { GameState } from "./models/GameModels";
import { DeckComponent } from "./reactComponents/Deck";
import { PlayerHand } from "./reactComponents/PlayerHand";

import "./board.scss";

import { EmployeeDeck } from "./reactComponents/EmployeeDeck";
import { ProjectDeck } from "./reactComponents/ProjectDeck";
import { ProjectLeads } from "./reactComponents/ProjectLeads";
import { PointTracker } from "./reactComponents/PointTracker";
import { PlayerBoard } from "./reactComponents/PlayerBoard";
import { DoneButton } from "./reactComponents/DoneButton";
import { ActionDisplay } from "./reactComponents/ActionDisplay";
import { ActionViews } from "./reactComponents/ActionViews";

export const SoftwareGameBoard = (props: BoardProps<GameState>) => {
	const edeck = props.G.employeeDeck;

	const pdeck = props.G.projectDeck;

	return (
		<div className="board">
			<PointTracker {...props} />

			<ActionDisplay  {...props} />

			<div className="projects">
				<EmployeeDeck G={props.G} ctx={props.ctx} playerId={props.playerID} moves={props.moves} />

				<ProjectDeck G={props.G} ctx={props.ctx} playerId={props.playerID} moves={props.moves} />
			</div>

			<ProjectLeads {...props} />

			<PlayerBoard {...props} />

			<DoneButton {...props} />

			<ActionViews {...props} />

			<PlayerHand G={props.G} ctx={props.ctx} playerId={props.playerID} moves={props.moves} />
		</div>
	);
};
