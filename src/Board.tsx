import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { Card } from "./models/DeckModels";

import { GameState } from "./models/GameModels";
import { DeckComponent } from "./reactComponents/Deck";
import { PlayerHand } from "./reactComponents/PlayerHand";

import "./board.css";

import pngLogo from './logo.png';
import { EmployeeDeck } from "./reactComponents/EmployeeDeck";
import { ProjectDeck } from "./reactComponents/ProjectDeck";
import { ProjectLeads } from "./reactComponents/ProjectLeads";

export const SoftwareGameBoard = (props: BoardProps<GameState>) => {
	const edeck = props.G.employeeDeck;

	const pdeck = props.G.projectDeck;

	return (
		<div className="board">
			
			<img src={pngLogo} alt="Software Empires Logo" className="gameLogo"/>

			<EmployeeDeck G={props.G} ctx={props.ctx} playerId={props.playerID} moves={props.moves} />

			<ProjectDeck G={props.G} ctx={props.ctx} playerId={props.playerID} moves={props.moves} />

			<ProjectLeads {...props} />

			<PlayerHand G={props.G} ctx={props.ctx} playerId={props.playerID} moves={props.moves} />
		</div>
	);
};
