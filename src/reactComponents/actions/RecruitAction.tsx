import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { FC, useState } from "react";
import { getCurrentAction } from "../../gameComponents/Players";
import { getMaximumRecruitmentStars } from "../../gameComponents/recruitmentRules";
import { EmployeeCardModel } from "../../models/CardModels";
import { Card, CardType } from "../../models/DeckModels";
import { GameState } from "../../models/GameModels";
import { CardSelector } from "../common/CardSelector";

import "./actionModal.scss";
import "./recruitAction.scss";

export const RecruitAction: FC<BoardProps<GameState>> = (props) => {
	const action = getCurrentAction(props.G, props.ctx);

	const [points, setPoints] = useState<number>(0);

	if (!action) return null;
	if (!action.cardOptions || action.cardOptions.length === 0 || !action.cardAction) return null;

	function onSelect(cs: Card[]) {
        props.moves.mngtConfirmRecruitAction(cs as EmployeeCardModel[])
    }

	function onChange(cs: Card[]) {
		const stars = cs.reduce((tot: number, c: Card) => {
			if (c.type !== CardType.EMPLOYEE) return tot;

			const ec = c as EmployeeCardModel;
			return tot + ec.stars;
		}, 0);
		setPoints(stars);
	}

	const maxStars = getMaximumRecruitmentStars(props.G, props.ctx);

	return (
		<div className="actionModal recruitAction shadowline shadowModal">
			<h1 className="title">Recruit</h1>

            <div className="starpoints">
                Stars available {points} / {maxStars}
            </div>
			<CardSelector cards={action.cardOptions} onSelect={onSelect} onChange={onChange} valid={points <= maxStars} />
		</div>
	);
};
