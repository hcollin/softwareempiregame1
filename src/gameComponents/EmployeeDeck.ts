import { Ctx } from "boardgame.io";
import { EmployeeCardModel } from "../models/CardModels";
import { CardType, Deck } from "../models/DeckModels";
import { GameState } from "../models/GameModels";
import createDeck, { deckShuffle } from "./Deck";

import pngCardback from "./cardbackEmployees.png";
import { arnd } from "rndlib";

const initialDeckData: [number, Partial<EmployeeCardModel>][] = [
	[5, {name: "Alice", title: "Junior Frontend Developer", stars: 1, founder: true}],
	[5, {name: "Justin", title: "Frontend Developer", stars: 2}],
	[5, {name: "Senior Frontend Developer", stars:3}],
	[5, {name: "Junior Backend Developer", stars:1, founder: true}],
	[5, {name: "Backend Developer", stars:2}],
	[5, {name: "Senior Backend Developer", stars:3}],
	[3, {name: "Junior UX Designer", stars:1, founder: true}],
	[3, {name: "UX Designer", stars:2}],
	[3, {name:  "Senior UX Designer", stars:3}],
	[4, {name: "Architect",stars: 3}],
	[3, {name: "Senior Architect", stars:4}],
	[2, {name: "Lead Architect", stars:5}],
];


const languageKeywords: string[] = ["Java", "JavaScript", "C#", "C++", "Python", "Rust", "Clojure", "Assembly"];
const roleKeywords: string[] = [ "Web Development", "Server Development", "Mobile Development", "Embedded Systems", "Application Development", "Database", "DevOps", "Cloud Infrastructure", "Testing", "UX design", "Architecture", "Management", "Graphics"];


export function getAllEmployeeCards(ctx: Ctx): Deck<EmployeeCardModel> {
	const cards: EmployeeCardModel[] = [];

	initialDeckData.forEach((v: [number, Partial<EmployeeCardModel>], ind: number) => {
		for (let i = 0; i < v[0]; i++) {
			
			const c: EmployeeCardModel = {
				id: `employeecard-${ind}-${i}`,
				type: CardType.EMPLOYEE,
				isFaceDown: true,
				name: "Coder",
				stars: 1,
				founder: false,
				actions: [],
				keywords: [],
				rules: [],

				...v[1]

			};

			if(c.keywords.length === 0) {
				c.keywords.push(arnd(languageKeywords));
				if(c.stars > 3) {
					c.keywords.push(arnd(languageKeywords));
				}
				if(c.stars > 1) {
					c.keywords.push(arnd(roleKeywords));
				}
				if(c.stars > 2) {
					c.keywords.push(arnd(roleKeywords));
				}
				if(c.stars > 4) {
					c.keywords.push(arnd(roleKeywords));
				}
				
			}

			cards.push(c);
		}
	});

	const d = createDeck<EmployeeCardModel>({ deck: cards, name: "Employees", cardback: pngCardback });

	const nd = ctx.random?.Shuffle(d.deck);
	if (nd) {
		d.deck = nd;
	}

	console.log(`Founders in deck: ${d.deck.filter((c: EmployeeCardModel) => c.founder).length}`);

	return d;
}

export function drawFounderCards(G: GameState, ctx: Ctx, n: number): EmployeeCardModel[] {
	G.employeeDeck = deckShuffle(ctx, G.employeeDeck);

	const foundersInDeck = G.employeeDeck.deck.filter((c: EmployeeCardModel) => c.founder);

	if (foundersInDeck.length < n) return [];

	const d = G.employeeDeck.deck;
	const founders: EmployeeCardModel[] = [];
	const od: EmployeeCardModel[] = [];
	while (founders.length < n && d.length > 0) {
		const c = d.shift();
		if (c) {
			if (c.founder) {
				founders.push(c);
			} else {
				od.push(c);
			}
		}
	}

	if (founders.length < n) {
		throw new Error(`Not enough Founder cards in the deck to initialize the game! ${founders.length} / ${n}`);
	}

	G.employeeDeck.deck = d.concat(od);
	G.employeeDeck = deckShuffle(ctx, G.employeeDeck);

	return founders;
}

export function getCeoCard(playerId: string): EmployeeCardModel {
	return {
		founder: true,
		id: `ceo-${playerId}`,
		type: CardType.EMPLOYEE,
		isFaceDown: true,
		name: "Ceo",
		stars: 3,
		actions: [
			{
				type: ["acquire", 1],
				text: "Acquire 1 Resource"
			},
			{
				type: ["recruit", 2],
				text: "Recruit 2"
			},
			{
				type: ["fire", 1],
				text: "Fire 1 employee"
			},
			{
				type: ["Sales", 3],
				text: "Sales"
			},
		],
		keywords: [],
		rules: [
			"This card cannot be discarded."
		],
		cardback: "",
	};
}
