import { Message } from "src/domain/entities/message.entity";
import { CheckGameTurnService } from "src/domain/ports/check-game-turn.service";
import { GameTurnRepository } from "src/domain/ports/game-turn.repository";
import { MessageService } from "src/domain/ports/message.service";

export class SendTurnNotificationUsecase {
  constructor(
    private checkGameTurnService: CheckGameTurnService,
    private gameTurnRepository: GameTurnRepository,
    private messageService: MessageService
  ) {}

  async execute() {
    const actualPlayer = await this.checkGameTurnService.checkGameTurn();
    const gameTurn = await this.gameTurnRepository.get();

    if (actualPlayer.name !== gameTurn.player.name) {
      const message = Message.create(actualPlayer.name, gameTurn.game);
      await this.messageService.sendMessage(message);
    } else {
      console.log("El Jugador anterior todavia no jugo");
    }
  }
}
