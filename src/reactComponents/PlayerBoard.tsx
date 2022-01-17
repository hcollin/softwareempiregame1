import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC } from "react";
import { getCurrentPlayerPublictState } from "../gameComponents/Players";
import { EmployeeCardModel } from "../models/CardModels";
import { GameState } from "../models/GameModels";
import { EmployeeCardComponent } from "./Cards/EmployeeCard";
import { CardSlots, FreeSlot } from "./CardSlots";

import "./playerBoard.css";

export const PlayerBoard: FC<BoardProps<GameState>> = (props) => {
    const state = getCurrentPlayerPublictState(props.G, props.ctx);

    if (state === null) return null;

    const managementCards: Array<EmployeeCardModel | null> = [...state.playedManagementCards];

    while (managementCards.length < 3) {
        managementCards.push(null);
    }

    return (
        <div className="playerBoard">
            <div className="resources">
                <label>Resources</label>
                {state.activeResources.length === 0 && <p className="notice">No resources.</p>}
            </div>
            <div className="activeProjects">
                <label>Active Projects</label>
                {state.activeProjects.length === 0 && (
                    <p className="notice">No active projects at the moment. Win something from the project leads!</p>
                )}
            </div>
            <div className="managementCards">
                <label>Management Cards</label>

                <CardSlots>
                    {managementCards.map((v: EmployeeCardModel | null) => {
                        if (v !== null) return <EmployeeCardComponent card={v} key={v.id} onClick={() => {}} />;
                        return <FreeSlot />
                    })}
                </CardSlots>
            </div>
        </div>
    );
};
