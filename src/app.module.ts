import { Module } from "@nestjs/common";
import { TurnNotificationController } from "./infrastructure/rest/turn-notification.controller";
import { SendTurnNotificationUsecase } from "./application/use-cases/send-turn-notification/send-turn-notification.usecase";
import { BGACheckGameTurnService } from "./infrastructure/adapters/game-turn/bga/bga-check-game-turn.service";
import { WhatsappMessageService } from "./infrastructure/adapters/message/whatsapp/whatsapp-message.service";
import { InMemoryGameTurnRepository } from "./infrastructure/adapters/game-turn/in-memory-game-turn.repository";
@Module({
  imports: [],
  controllers: [TurnNotificationController],
  providers: [
    {
      provide: "SendTurnNotificationUsecase",
      useClass: SendTurnNotificationUsecase,
    },
    {
      provide: "BGACheckGameTurnService",
      useClass: BGACheckGameTurnService,
    },
    {
      provide: "InMemoryGameTurnRepository",
      useClass: InMemoryGameTurnRepository,
    },
    {
      provide: "WhatsappMessageService",
      useClass: WhatsappMessageService,
    },
  ],
})
export class AppModule {}
