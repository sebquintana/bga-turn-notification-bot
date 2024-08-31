import { Injectable } from "@nestjs/common";
import { GameTurn } from "src/domain/entities/game-turn.entity";
import { Player } from "src/domain/entities/player.vo";
import { GameTurnRepository } from "src/domain/ports/game-turn.repository";

@Injectable()
export class InMemoryGameTurnRepository implements GameTurnRepository {
  save(gameTurn: GameTurn): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async get(): Promise<GameTurn> {
    return GameTurn.create("My City", "Axel");
  }
}
