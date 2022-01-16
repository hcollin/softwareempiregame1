import { ProjectCardModel, ProjectLead } from "../models/CardModels";
import { CardType, Deck } from "../models/DeckModels";
import createDeck, { deckDraw, deckShuffle } from "./Deck";

import pngCardback from "./cardbackProject.png";
import { Ctx } from "boardgame.io";
import { GameState } from "../models/GameModels";

const initialProjectDeck: [number, Partial<ProjectCardModel>][] = [
	[1, { name: "Project 1", industry: "Logistics" }],
	[1, { name: "Project 2", industry: "Security" }],
	[1, { name: "Project 3", industry: "Finance" }],
	[1, { name: "Project 4", industry: "Finance" }],
	[1, { name: "Project 5", industry: "Healthcare" }],
	[1, { name: "Project 6", industry: "Healthcare" }],
	[1, { name: "Project 7", industry: "Security" }],
	[1, { name: "Project 8", industry: "Logistics" }],
	[1, { name: "Project 9", industry: "Military" }],
	[1, { name: "Project 10", industry: "Military" }],
	[1, { name: "Project 11", industry: "Entertainment" }],
	[1, { name: "Project 12", industry: "Entertainment" }],
];

export function getAllProjectCards(ctx: Ctx): Deck<ProjectCardModel> {
	const cards: ProjectCardModel[] = [];

	initialProjectDeck.forEach((v: [number, Partial<ProjectCardModel>], ind: number) => {
		for (let i = 0; i < v[0]; i++) {
			const c: ProjectCardModel = {
				id: `projectcard-${ind}-${i}`,
				type: CardType.PROJECT,
				isFaceDown: true,
				name: "Unknown project",
                time: 2,
                size: 3,
                vps: 3,
                industry: "",
                keywords: [],
                rules: [],
				...v[1],
			};
			cards.push(c);
		}
	});

	const d = createDeck<ProjectCardModel>({ deck: cards, name: "Projects", cardback: pngCardback });

	const nd = ctx.random?.Shuffle(d.deck);
	if (nd) {
		d.deck = nd;
	}

	return d;
}

export function initProjectLeads(G: GameState, ctx: Ctx) {
	deckShuffle(ctx, G.projectDeck);

	const projectLeads: ProjectLead[] = [];

	const [pc, nd] = deckDraw<ProjectCardModel>(G.projectDeck, 4);
	G.projectDeck = nd;

    pc.forEach((c: ProjectCardModel) => {
        projectLeads.push({
            project: c,
            timeTokens: 0,
            bids: []
        });
    });

    G.projectLeads = projectLeads;
}


export function addNewProjectLead(G: GameState, ctx: Ctx, pcs: ProjectCardModel[]) {
    pcs.forEach((p: ProjectCardModel) => {
        const pl: ProjectLead = {
            bids: [],
            timeTokens: 0,
            project: p
        };
        G.projectLeads.push(pl);
    });
    
}