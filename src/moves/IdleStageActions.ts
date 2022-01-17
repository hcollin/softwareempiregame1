import { Ctx } from "boardgame.io";
import { GameState } from "../models/GameModels";



export function playCardFromHandAction(G: GameState, ctx: Ctx) {
    
}

export function endTurnAction(G: GameState, ctx: Ctx, playerId: string) {
    if(!G.playersDone.includes(playerId)) {
        G.playersDone.push(playerId);
    }
}