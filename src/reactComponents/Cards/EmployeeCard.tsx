import { FC, useState } from "react";
import { EmployeeCardActionModel, EmployeeCardModel } from "../../models/CardModels";

import pngStar from "./star.png";

import "./employeeCard.scss";

export const EmployeeCardComponent: FC<{ card: EmployeeCardModel; onClick: (c: EmployeeCardModel) => void, className?: string }> = (props) => {
	const c: EmployeeCardModel = props.card;

	const [mode, setMode] = useState<string>(() => {
		if (c.keywords.length > 0) return "KEYWORDS";
		if (c.actions.length > 0) return "ACTIONS";
		return "RULES";
	});

	function changeMode(toMode: string) {
		if (toMode === "RULES" && c.rules.length === 0) return;
		if (toMode === "ACTIONS" && c.actions.length === 0) return;
		if (toMode === "KEYWORDS" && c.keywords.length === 0) return;
		setMode(toMode);
	}

	function handleClick() {
		if(props.onClick) {
			props.onClick(c);
		}
	}

	return (
		<div className={`employeeCardContainer ${props.className || ""}`} onClick={handleClick}>
			<h1>{c.name}</h1>
			{c.title && <h2>{c.title}</h2>}

			{mode === "KEYWORDS" && (
				<div className="keywords">
					{c.keywords.map((k: string, i: number) => {
						const id = `${c.id}-keyword-${i}`;
						return <div className="word" key={id}>{k}</div>;
					})}
				</div>
			)}

			{mode === "RULES" && (
				<div className="rules">
					<h3>Rules</h3>
					{c.rules.map((txt: string, i: number) => {
						return <p key={`${c.id}-rule-${i}`}>{txt}</p>;
					})}
				</div>
			)}

			{mode === "ACTIONS" && (
				<div className="actions">
					<h3>Actions</h3>
                    {c.actions.map((a: EmployeeCardActionModel, i: number) => {
                        const id  = `${c.id}-act-${i}`;
                        return <p key={id}>{a.text}</p>
                    })}
				</div>
			)}

			<div className="stars">
				{[...Array<number>(c.stars)].map((v: number, i: number) => {
					const id = `${c.id}-star-${i}`;
					return <img src={pngStar} alt="star" className="star" key={id} />;
				})}
			</div>

			<footer>
				<div className={c.keywords.length === 0 ? "disabled" : "keywords"} onMouseEnter={() => changeMode("KEYWORDS")}>
					Keys
				</div>
				<div className={c.rules.length === 0 ? "disabled" : "rules"} onMouseEnter={() => changeMode("RULES")}>
					Rules
				</div>
				<div className={c.actions.length === 0 ? "disabled" : "actions"} onMouseEnter={() => changeMode("ACTIONS")}>
					Acts
				</div>
			</footer>
		</div>
	);
};
