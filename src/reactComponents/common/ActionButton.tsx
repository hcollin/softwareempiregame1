import { FC } from "react"

import svgOk from "./okIcon.svg"
import svgCancel from "./cancelIcon.svg";

import "./actionButton.scss";

interface ActionButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    style?: "POSITIVE"|"NEGATIVE"|"NEUTRAL";
    icon?: "ok"|"cancel";
}


export const ActionButton: FC<ActionButtonProps> = (props) => {

    const classes: string[] = ["actionButton"];
    if(props.style) classes.push(props.style.toLowerCase());
    if(props.className) classes.push(props.className);
    if(props.disabled === true) classes.push("disabled");

    const icon = props.icon || null;

    return (
        <button className={classes.join(" ")} disabled={props.disabled || false} onClick={props.onClick}>
            {icon === "ok" && <img src={svgOk} alt="OK icon" /> }
            {icon === "cancel" && <img src={svgCancel} alt="Cancel icon" /> }
            {props.children}
        </button>
    )
}