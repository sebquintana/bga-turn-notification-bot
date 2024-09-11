import { Inject, Injectable } from "@nestjs/common";
import { CheckGameTurnService } from "domain/ports/check-game-turn.service";
import { GameTurnRepository } from "domain/ports/game-turn.repository";
import { MessageService } from "domain/ports/message.service";

@Injectable()
export class SendTurnNotificationUsecase {
  private readonly gameName = "Azul";
  private readonly arnakTable = "3/azul?table=556917628";

  constructor(
    @Inject("BGACheckGameTurnService")
    private checkGameTurnService: CheckGameTurnService,
    @Inject("InMemoryGameTurnRepository")
    private gameTurnRepository: GameTurnRepository,
    @Inject("WhatsappMessageService")
    private messageService: MessageService
  ) {}

  async execute() {
    const actualPlayer = await this.checkGameTurnService.checkGameTurn("Azul");
    const gameTurn = await this.gameTurnRepository.get();

    if (!gameTurn || actualPlayer.name !== gameTurn.player.name) {
      await this.messageService.sendTurnMessage(
        actualPlayer.phoneNumber,
        this.arnakTable,
        this.gameName
      );
    } else {
      console.log("El Jugador anterior todavia no jugo");
    }
  }
}
