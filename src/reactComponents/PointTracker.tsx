import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC } from "react";
import { GameState, PublicPlayerState } from "../models/GameModels";

import pngLogo from './logo.png';

import "./pointTracker.css";

export const PointTracker: FC<BoardProps<GameState>> = (props) => {
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
