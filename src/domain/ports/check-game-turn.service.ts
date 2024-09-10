import { Player } from "../entities/player.vo";

export interface CheckGameTurnService {
  checkGameTurn(game?: string): Promise<Player>;
}
