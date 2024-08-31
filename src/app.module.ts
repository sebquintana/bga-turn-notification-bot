import { Module } from "@nestjs/common";
import { TurnNotificationController } from "./infrastructure/rest/turn-notification.controller";
import { SendTurnNotificationUsecase } from "./application/use-cases/send-turn-notification/send-turn-notification.usecase";
import { BGACheckGameTurnService } from "./infrastructure/adapters/bga/bga-check-game-turn.service";
import { WhatsappMessageService } from "./infrastructure/adapters/whatsapp-message.service";
import { InMemoryGameTurnRepository } from "./infrastructure/adapters/in-memory-game-turn.repository";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que las variables estén disponibles globalmente
    }),
  ],
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
