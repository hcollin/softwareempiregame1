import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC } from "react";
import { getCurrentAction } from "../gameComponents/Players";
import { EmployeeCardActionType } from "../models/CardModels";
import { GameState } from "../models/GameModels";
import { RecruitAction } from "./actions/RecruitAction";



export const ActionViews:  FC<BoardProps<GameState>> = (props) => {

    const action = getCurrentAction(props.G, props.ctx);

    if(!action) return null;

    // Show Recruit Action View
    if(action.actionCode === EmployeeCardActionType.RECRUIT) {
        return <RecruitAction {...props} />
    }

    return null;
}