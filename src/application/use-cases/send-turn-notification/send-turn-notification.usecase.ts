import { Inject, Injectable } from "@nestjs/common";
import { CheckGameTurnService } from "src/domain/ports/check-game-turn.service";
import { GameTurnRepository } from "src/domain/ports/game-turn.repository";
import { MessageService } from "src/domain/ports/message.service";

@Injectable()
export class SendTurnNotificationUsecase {
  private readonly gameName = "Las Ruinas Perdidas de Arnak";
  private readonly arnakTable = "1/arnak?table=555755591";

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
