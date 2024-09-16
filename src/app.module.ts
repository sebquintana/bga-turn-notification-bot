import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SendTurnNotificationUsecase } from "application/use-cases/send-turn-notification/send-turn-notification.usecase";
import { TurnNotificationController } from "infrastructure/rest/turn-notification.controller";
import { BGACheckGameTurnService } from "infrastructure/adapters/game-turn/bga/bga-check-game-turn.service";
import { WhatsappMessageService } from "infrastructure/adapters/message/whatsapp/whatsapp-message.service";
import { InMemoryGameTurnRepository } from "infrastructure/adapters/game-turn/in-memory-game-turn.repository";
import { MockWhatsappMessageService } from "infrastructure/adapters/message/whatsapp/mock-whatsapp-message.service";
import { InMemoryPlayerRepository } from "infrastructure/adapters/player/in-memory-player.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que las variables estén disponibles globalmente
      envFilePath: ".env",
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
      provide: "InMemoryPlayerRepository",
      useClass: InMemoryPlayerRepository,
    },
    {
      provide: "WhatsappMessageService",
      useClass: WhatsappMessageService,
    },
    {
      provide: "MockWhatsappMessageService",
      useClass: MockWhatsappMessageService,
    },
  ],
})
export class AppModule {}
