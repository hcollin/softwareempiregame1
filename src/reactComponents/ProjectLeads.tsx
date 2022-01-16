import { Ctx } from "boardgame.io"
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC } from "react"
import { ProjectLead } from "../models/CardModels";
import { GameState } from "../models/GameModels"
import { ProjectCardComponent } from "./Cards/ProjectCard";

import "./projectLeads.css";

export const ProjectLeads: FC< BoardProps<GameState>>  = (props) => {


    const leads = props.G.projectLeads;

    return (
        <div className="projectLeads">
            <h1>Project Leads</h1>

            <div className="row">
                {leads.map((pl: ProjectLead) => <ProjectLeadContainer key={pl.project.id} lead={pl}/>)}
            </div>
        </div>
    )
}


const ProjectLeadContainer: FC<{lead: ProjectLead}> = (props) => {
    return <div className="projectLeadContainer">
        <ProjectCardComponent card={props.lead.project} />
    </div>
}