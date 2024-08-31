import { Module } from "@nestjs/common";
import { BotController } from "./infrastructure/rest/bot.controller";
import { QRBotUsecase } from "./application/use-cases/qr-bot.usecase";
import { EventEmitterModule } from "@nestjs/event-emitter";
@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [BotController],
  providers: [QRBotUsecase],
})
export class AppModule {}
