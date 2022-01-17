import { BoardProps } from "boardgame.io/dist/types/packages/react"
import { FC } from "react"
import { GameState } from "../models/GameModels"


import "./doneButton.css";

export const DoneButton: FC<BoardProps<GameState>> = (props) => {

    function handleClick() {
        props.moves.endTurnAction(props.G, props.ctx, props.ctx.currentPlayer);
    }

    const disableButton = props.moves.endTurnAction === undefined || props.G.playersDone.includes(props.ctx.currentPlayer);
    return (
        <button className="doneButton" onClick={handleClick} disabled={disableButton}>
            END TURN
        </button>
    )
}