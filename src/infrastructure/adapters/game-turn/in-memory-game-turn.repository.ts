import { Injectable } from "@nestjs/common";
import { GameTurn } from "domain/entities/game-turn.entity";
import { GameTurnRepository } from "domain/ports/game-turn.repository";

@Injectable()
export class InMemoryGameTurnRepository implements GameTurnRepository {
  private storage: Map<string, GameTurn>;

  constructor() {
    this.storage = new Map();
  }

  async save(gameTurn: GameTurn): Promise<void> {
    this.storage.set(gameTurn.id, gameTurn);
  }
  async get(): Promise<GameTurn> {
    return this.storage.get("My City");
  }
}
