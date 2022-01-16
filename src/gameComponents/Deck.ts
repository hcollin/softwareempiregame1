import { Ctx } from "boardgame.io";
import { EmployeeCardModel } from "../models/CardModels";
import { Card, CardType, Deck } from "../models/DeckModels";

export default function createDeck<T extends Card>(options: { deck: T[]; name: string; cardback: string }): Deck<T> {
	const deckOfCards: T[] = options.deck || [];
	const discardPile: T[] = [];

	const d: Deck<T> = {
		name: options.name,
		deck: deckOfCards,
		discard: discardPile,
		cardback: options.cardback || "",
	};

	return d;
}

export function deckDraw<T extends Card>(d: Deck<T>, n: number): [T[], Deck<T>] {
	if (d.deck.length > n) {
		const cards: T[] = [];
		for (let i = 0; i < n; i++) {
			const c = d.deck.shift();
			if (c) {
				cards.push(c);
			}
		}
		return [cards, d];
	}
	return [[], d];
}

export function deckDiscard<T extends Card>(d: Deck<T>, c: T[]): Deck<T> {
	c.forEach((c: T) => {
		d.discard.unshift(c);
	});
	return d;
}

export function deckShuffle<T extends Card>(ctx: Ctx, d: Deck<T>, includeDiscard?: boolean): Deck<T> {
	if (includeDiscard) {
		d.deck = d.deck.concat(d.discard);
		d.discard = [];
	}

	const ndeck = ctx.random?.Shuffle(d.deck);
	if (ndeck) {
		d.deck = ndeck;
	}
	return d;
}

/**
 * Create an array of cards that can be used to initialize the deck
 * @param cards
 * @param name
 * @returns
 */
export function createCards(cards: [number, string][], name: string): Card[] {
	const cs: Card[] = [];
	let counter = 100;
	cards.forEach((c: [number, string]) => {
		for (let i = 0; i < c[0]; i++) {
			const card: Card = {
				id: `${name}-${counter}`,
				isFaceDown: true,
				name: c[1],
				type: CardType.EMPLOYEE,
				cardback: "",
			};
			cs.push(card);
			counter++;
		}
	});

	return cs;
}
