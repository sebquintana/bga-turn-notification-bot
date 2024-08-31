import { v4 as uuidv4 } from "uuid";
import { GameStatus } from "../enum/game-status";
import { Player } from "./player.vo";

export class GameTurn {
  private constructor(
    readonly id: string,
    readonly game: string,
    readonly player: Player,
    readonly status: GameStatus,
    readonly table: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  static create(game: string, player: Player, table: string): GameTurn {
    return new GameTurn(
      uuidv4(),
      game,
      player,
      GameStatus.IN_PROGRESS,
      table,
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
      this.table,
      this.createdAt,
      new Date()
    );
  }

  changePlayer(player: Player): GameTurn {
    return new GameTurn(
      this.id,
      this.game,
      player,
      this.status,
      this.table,
      this.createdAt,
      new Date()
    );
  }
}
