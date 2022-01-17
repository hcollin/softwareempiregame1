import { Ctx, Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import createDeck, { createCards, deckShuffle } from "./gameComponents/Deck";
import { getAllEmployeeCards } from "./gameComponents/EmployeeDeck";
import { initializePlayerPublic, initializePlayerSecret } from "./gameComponents/Players";
import { getAllProjectCards, initProjectLeads } from "./gameComponents/ProjectDeck";
import { GameState } from "./models/GameModels";
import { endTurnAction, playCardFromHandAction } from "./moves/IdleStageActions";
import { addNewProjectLeadMove, discardEmplyeeCard, drawSingleEmplyeeCardToHand } from "./moves/PlayPhase";

export const SoftwareGame: Game<GameState> = {
    name: "Software_Empires",

    minPlayers: 2,
    maxPlayers: 4,

    setup: (ctx: Ctx): GameState => {
        const NG: GameState = {
            employeeDeck: getAllEmployeeCards(ctx),
            projectDeck: getAllProjectCards(ctx),
            resourceDeck: [],
            projectLeads: [],
            playerBoards: [],
            playerSecrets: [],
            playersDone: [],
        };

        initProjectLeads(NG, ctx);

        ctx.playOrder.map((id: string) => {
            const secretState = initializePlayerSecret(NG, ctx, id);
            NG.playerSecrets.push(secretState);
            const publicState = initializePlayerPublic(NG, ctx, id);
            NG.playerBoards.push(publicState);
        });

        return NG;
    },

    phases: {
        play: {
            start: true,
            next: "score",
            moves: {
                // drawSingleEmplyeeCardToHand,
                // discardEmplyeeCard,
                // addNewProjectLeadMove,
            },
            onBegin: (G: GameState, ctx: Ctx) => {
                // ctx.events?.setStage("idle");
                console.log("Begin Play phase");
            },
            turn: {
                onBegin: (G: GameState, ctx: Ctx) => {
                    console.log("Begin Turn");
                    if (ctx.events) {
                        ctx.events?.setActivePlayers({
                            all: "idle",
                        });
                    } else {
                        console.warn("No events on ctx!");
                    }
                },
                stages: {
                    idle: {
                        moves: {
                            playCardFromHandAction,
                            endTurnAction,
                        },
                    },
                    management: {
                        moves: {},
                        next: "idle",
                    },
                    sales: {
                        moves: {},
                        next: "idle",
                    },
                    project: {
                        moves: {},
                        next: "idle",
                    },
                    resource: {
                        moves: {},
                        next: "idle",
                    },
                    end: {
                        moves: {},
                    },
                },
            },
        },
        score: {
            next: "resolve",
        },
        resolve: {
            next: "play",
        },
    },

    moves: {},

    endIf: (G, ctx) => {},
};
