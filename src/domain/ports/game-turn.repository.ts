import { GameTurn } from "../entities/game-turn.entity";

export interface GameTurnRepository {
  get(): Promise<GameTurn>;
  save(gameTurn: GameTurn): Promise<void>;
}
