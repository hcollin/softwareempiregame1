import { FC } from "react";
import { ProjectCardModel } from "../../models/CardModels";

import "./projectCard.css";

export const ProjectCardComponent: FC<{card: ProjectCardModel}> = (props) => {

    
    return (
        <div className="projectCardContainer">
            <h1>{props.card.name}</h1>
            {props.card.industry && <h2>{props.card.industry}</h2>}


            <div className="rules">
                {props.card.rules?.map((txt: string, i: number) => {
                    const id = `${props.card.id}-rule-${i}`;
                    return (<p key={id}>{txt}</p>);
                })}
            </div>
            <footer>
                <div>
                    <label>VPs</label>
                    {props.card.vps}
                </div>
                <div>
                <label>Time</label>
                    {props.card.time}
                </div>
                <div>
                <label>Size</label>
                    {props.card.size}
                </div>
            </footer>
        </div>
    )
}