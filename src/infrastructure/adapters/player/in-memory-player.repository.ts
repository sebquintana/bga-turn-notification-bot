import { Player } from "domain/entities/player.vo";
import { PlayerRepository } from "domain/ports/player.repository";

export class InMemoryPlayerRepository implements PlayerRepository {
  private players: Player[] = [];

  constructor() {
    this.initPlayers();
  }

  private initPlayers() {
    this.players = [
      new Player("Seba", "confignumber", "squintana"),
      new Player("Axel", "confignumber", "axelz056"),
      new Player("Sofi", "confignumber", "Sofialaras"),
      new Player("Santi", "confignumber", "Sanx123"),
      new Player("AxelZeta", "confignumber", "¡Es tu turno!"), // Aca va el player con el que nos logueamos a la cuenta.
    ];
  }

  async findByBgaNickName(bgaNickName: string): Promise<Player> {
    const player = this.players.find(
      (player) => player.bgaNickName === bgaNickName
    );
    if (!player) {
      throw new Error("Player not found");
    }
    return player;
  }
}
