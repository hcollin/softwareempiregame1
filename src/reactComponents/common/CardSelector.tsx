import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC, useEffect, useState } from "react";
import { getCurrentAction } from "../../gameComponents/Players";
import { EmployeeCardModel } from "../../models/CardModels";
import { Card, CardType } from "../../models/DeckModels";
import { GameState } from "../../models/GameModels";
import { EmployeeCardComponent } from "../Cards/EmployeeCard";
import { ActionButton } from "./ActionButton";

import "./cardSelector.scss";

interface CardSelectorProps {
	cards: Card[];
	minSelect?: number;
	maxSelect?: number;
	onSelect: (cards: Card[]) => void;
	onChange?: (cards: Card[]) => void;
    valid?: boolean;
}

export const CardSelector: FC<CardSelectorProps> = (props) => {
	const [selected, setSelected] = useState<Card[]>([]);

	useEffect(() => {
		if (props.onChange) {
			props.onChange(selected);
		}
	}, [selected, props]);

	function selectCard(c: Card) {
		
		setSelected((prev: Card[]) => {
			if (prev.includes(c)) {
				return prev.filter((pc: Card) => pc.id !== c.id);
			}
			return [...prev, c];
		});
	}

    const isValid = props.valid === undefined || props.valid === true;

    function confirm() {
        if(props.valid === undefined || props.valid === true) {
            props.onSelect([...selected]);
            setSelected([]);

        }
    }

	console.log("Selected", selected);

	return (
		<div className="cardSelector">
			<div className="cards">
				{props.cards.map((c: Card) => {
					const isSelected = selected.includes(c);
					return (
						<div className={`cardOption ${isSelected ? "selected" : ""}`} key={c.id}>
							{c.type === CardType.EMPLOYEE && <EmployeeCardComponent card={c as EmployeeCardModel} onClick={selectCard} />}
							{isSelected && <p>Selected</p>}
							{!isSelected && <p>&nbsp;</p>}
						</div>
					);
				})}

				<div className="confirm">
					<ActionButton style="POSITIVE" icon="ok" onClick={confirm} disabled={!isValid}>
						Confirm
					</ActionButton>
				</div>
			</div>
		</div>
	);
};
