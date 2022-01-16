import { BoardProps } from "boardgame.io/dist/types/packages/react";

export const SoftwareGameBoard = (props: BoardProps) => {
	function handleClick(id: number) {
        props.moves.clickCell(id);
    }

	return (
		<div className="board">
			{props.G.cells.map((v: string, i: number) => {
				return <Box index={i} key={`key-${i}`} value={v} onClick={handleClick} />;
			})}
		</div>
	);
};

function Box(props: {index: number,  value: string; onClick: (v: number) => void }) {
	return (
		<div className="box" onClick={() => props.onClick(props.index)}>
			{props.value === "0" && "O"}
			{props.value === "1" && "X"}
		</div>
	);
}
