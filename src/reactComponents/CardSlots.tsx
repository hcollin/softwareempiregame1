import { FC } from "react"
import { isPropertySignature } from "typescript";


import "./cardSlots.css";

export const CardSlots: FC = (props) => {

    return (
        <div className="cardSlots">
            {props.children}
        </div>
    )
}

export const FreeSlot: FC<{className?: string}> = (props) => {
    return (
        <div className={`freeSlot ${props.className || ""}`}>
            {props.children || "Play Card here"}
        </div>
    )
}