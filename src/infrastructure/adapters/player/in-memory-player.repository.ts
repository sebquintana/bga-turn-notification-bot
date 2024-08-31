import { Player } from "src/domain/entities/player.vo";
import { PlayerRepository } from "src/domain/ports/player.repository";

export class InMemoryPlayerRepository implements PlayerRepository {
  private players: Player[] = [];

  constructor() {
    this.initPlayers();
  }

  private initPlayers() {
    this.players = [
      new Player("Seba", "confignumber", "squintana"),
      new Player("Axel", "confignumber", "axelz056"),
    ];
  }

  async findByBgaNickName(bgaNickName: string): Promise<Player | null> {
    return (
      this.players.find((player) => player.bgaNickName === bgaNickName) || null
    );
  }
}
