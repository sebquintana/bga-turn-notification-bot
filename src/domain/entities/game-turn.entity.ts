import { v4 as uuidv4 } from "uuid";
import { GameStatus } from "../enum/game-status";
import { Player } from "./player.vo";

export class GameTurn {
  private constructor(
    readonly id: string,
    readonly game: string,
    readonly player: Player,
    readonly status: GameStatus,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  static create(game: string, playerName: string): GameTurn {
    return new GameTurn(
      uuidv4(),
      game,
      new Player(playerName),
      GameStatus.IN_PROGRESS,
      new Date(),
      new Date()
    );
  }

  endGame(): GameTurn {
    return new GameTurn(
      this.id,
      this.game,
      this.player,
      GameStatus.FINISHED,
      this.createdAt,
      new Date()
    );
  }

  changePlayer(playerName: string): GameTurn {
    return new GameTurn(
      this.id,
      this.game,
      new Player(playerName),
      this.status,
      this.createdAt,
      new Date()
    );
  }
}
