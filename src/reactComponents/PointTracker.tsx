import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC } from "react";
import { getCurrentPlayerSecrectState } from "../gameComponents/Players";
import { GameState, PublicPlayerState } from "../models/GameModels";

import pngLogo from './logo.png';

import "./pointTracker.css";

export const PointTracker: FC<BoardProps<GameState>> = (props) => {

    const state = getCurrentPlayerSecrectState(props.G, props.ctx);
    if(!state) return null;
    const action = state.action;

    if(action) return null;


    return (
        <div className="pointTracker">
            <div className="title">Points!</div>
            {props.G.playerBoards.map((pps: PublicPlayerState) => {
                return (
                    <div className="playerScore" key={`pointTracker-${pps.playerId}`}>
                        {pps.playerId}: {pps.points}
                    </div>
                );
            })}
            <div></div>
            <div className="logo">
                <img src={pngLogo} alt="Software Empires Logo" />
            </div>
        </div>
    );
};
