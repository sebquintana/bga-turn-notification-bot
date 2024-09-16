import { Controller, Get, Inject } from "@nestjs/common";
import { SendTurnNotificationUsecase } from "application/use-cases/send-turn-notification/send-turn-notification.usecase";

@Controller("turn-notification")
export class TurnNotificationController {
  constructor(
    @Inject("SendTurnNotificationUsecase")
    private sendTurnNotificationUsecase: SendTurnNotificationUsecase
  ) {}

  @Get()
  async sendTurnNotification() {
    await this.sendTurnNotificationUsecase.execute();
  }
}
