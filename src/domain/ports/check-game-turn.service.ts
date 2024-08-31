import { GameTurn } from "../entities/game-turn.entity";
import { Player } from "../entities/player.vo";

export interface CheckGameTurnService {
  checkGameTurn(): Promise<Player>;
}
