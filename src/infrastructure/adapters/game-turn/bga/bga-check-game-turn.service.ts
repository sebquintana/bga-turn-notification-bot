import { Injectable } from "@nestjs/common";
import { Player } from "src/domain/entities/player.vo";
import { CheckGameTurnService } from "src/domain/ports/check-game-turn.service";

@Injectable()
export class BGACheckGameTurnService implements CheckGameTurnService {
  async checkGameTurn(): Promise<Player> {
    // TODO: Implementar la logica para obtener el jugador actual del juego
    // Loguearnos a la bga
    // Obtener el jugador actual del juego
    // devolverlo
    return new Player("Axel", "confignumber", "axelz056");
  }
}
