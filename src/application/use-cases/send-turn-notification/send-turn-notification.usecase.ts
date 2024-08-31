import { Inject, Injectable } from "@nestjs/common";
import { Message } from "src/domain/entities/message.entity";
import { CheckGameTurnService } from "src/domain/ports/check-game-turn.service";
import { GameTurnRepository } from "src/domain/ports/game-turn.repository";
import { MessageService } from "src/domain/ports/message.service";

@Injectable()
export class SendTurnNotificationUsecase {
  constructor(
    @Inject("BGACheckGameTurnService")
    private checkGameTurnService: CheckGameTurnService,
    @Inject("InMemoryGameTurnRepository")
    private gameTurnRepository: GameTurnRepository,
    @Inject("WhatsappMessageService")
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
