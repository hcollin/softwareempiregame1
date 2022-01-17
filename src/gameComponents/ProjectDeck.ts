import { ProjectCardModel, ProjectLead } from "../models/CardModels";
import { CardType, Deck } from "../models/DeckModels";
import createDeck, { deckDraw, deckShuffle } from "./Deck";

import pngCardback from "./cardbackProject.png";
import { Ctx } from "boardgame.io";
import { GameState } from "../models/GameModels";
import { arnd, arnds, rnd } from "rndlib";
import { languageKeywords, roleKeywords } from "./EmployeeDeck";
import { idText } from "typescript";

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

export function getRandomProjectDeck(ctx: Ctx): Deck<ProjectCardModel> {
	const cards: ProjectCardModel[] = [];

	while(cards.length < 50) {
		cards.push(randomProject());
	}

	const d = createDeck<ProjectCardModel>({ deck: cards, name: "Projects", cardback: pngCardback });

	const nd = ctx.random?.Shuffle(d.deck);
	if (nd) {
		d.deck = nd;
	}

	return d;
}

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


function randomProject(): ProjectCardModel {


	const prj: ProjectCardModel = {
		id: `rnd-prj-card-${rnd(1000,99999)}`,
		industry: arnd(["Finance", "Entertainment", "Industrial", "Public Sector", "Military"]),
		isFaceDown: true,
		name: "",
		size: rnd(1, 5),
		time: rnd(1,3),
		type: CardType.PROJECT,
		vps: rnd(2,5),
		rules: [],
		keywords: [], // arnds(languageKeywords, rnd(1,2), true).concat(arnds(roleKeywords, rnd(1,3), true))
	};

	const totalKsCount = rnd(prj.size, prj.size *2);

	let ks: string[] = [];
	ks = ks.concat(arnds(languageKeywords, rnd(1,prj.size), true));
	while(ks.length < totalKsCount) {
		const r = arnd(roleKeywords);
		if(!ks.includes(r)) {
			ks.push(r);
		}
	}
		
	prj.keywords = ks;
	const n = arnd(targetNameDict[prj.industry]);
	prj.name = `${arnd(adjectiveDict)} ${n} ${arnd(targetName2Dict)}`;
	
	prj.vps = 3 + ( prj.keywords.length - prj.size) + (2 - prj.time );
	
	// console.log(`${prj.industry}: ${prj.name}`);

	return prj;
	
}

const adjectiveDict: string[] = [
	"Interim",
	"Advanced",
	"Next generation",
	"ML based",
	"AI powered",
	"Groundbreaking",
	"Updated",
	"Legacy",
	"Cool",
	"Global",
	"Secure",
	"National",
	"Suspicious",
	"Alternative",
	"Hardened",
	""
];

const targetNameDict: Record<string, string[]> = {
	"Finance": ["stock", "payment", "accounting", "loophole", "database", "bitcoin", "crypto", "loan"],
	"Entertainment": ["movie script", "add", "picture sharing", "trolling", "virtual reality", "social media", "MMO", "3d game"],
	"Industrial": ["IoT", "inventory", "tracking", "maintenance", "controller", "factory"],
	"Public Sector": ["medical", "tax", "education", "snooping", "rescue", "patient", "anti loophole"],
	"Military": ["missile", "defense", "disaster", "emergency", "radar", "cyber warfare", "antiterrorism", "security", "fast response"]
};

const targetName2Dict: string[] = [
	"system",
	"solution",
	"software",
	"program",
	"application",
	"engine",
	"generator",
	"cluster",
	"prototype",
	"framework",
	"platform",

];