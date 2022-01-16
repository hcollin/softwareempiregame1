import React from "react";
import { Client } from "boardgame.io/react";
import { SoftwareGameBoard } from "./Board";
import { SoftwareGame } from "./Game";
import "./App.css";

function App() {
	const GameClient = Client({ board: SoftwareGameBoard, game: SoftwareGame, numPlayers: 4 });

	return (
		<div>
			<GameClient />
		</div>
	);
}

export default App;
