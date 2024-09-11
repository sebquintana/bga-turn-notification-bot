import { BGACheckGameTurnService } from "infrastructure/adapters/game-turn/bga/bga-check-game-turn.service";
import { SendTurnNotificationUsecase } from "application/use-cases/send-turn-notification/send-turn-notification.usecase";
import { ConfigService } from "@nestjs/config";
import { InMemoryPlayerRepository } from "infrastructure/adapters/player/in-memory-player.repository";
import { InMemoryGameTurnRepository } from "infrastructure/adapters/game-turn/in-memory-game-turn.repository";
import { WhatsappMessageService } from "infrastructure/adapters/message/whatsapp/whatsapp-message.service";

export const handler = async (event: any): Promise<void> => {
  const sendTurnNotificationUseCase = new SendTurnNotificationUsecase(
    new BGACheckGameTurnService(
      new ConfigService(),
      new InMemoryPlayerRepository()
    ),
    new InMemoryGameTurnRepository(),
    new WhatsappMessageService()
  );

  await sendTurnNotificationUseCase.execute();
};
