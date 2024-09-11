import { Controller, Get, Res } from "@nestjs/common";
import * as QRCode from "qrcode";
import { Response } from "express";
import { OnEvent } from "@nestjs/event-emitter";
import { QRBotUsecase } from "application/use-cases/qr-bot.usecase";

@Controller("bot")
export class BotController {
  private qrCode: string;
  constructor(private qrBotUsecase: QRBotUsecase) {}

  @OnEvent("qrcode.created")
  handleQrcodeCreatedEvent(qrCode: string) {
    this.qrCode = qrCode;
  }

  @Get("qrcode")
  async getQrCode(@Res() response: Response) {
    if (!this.qrCode) {
      return response.status(404).send("QR code not found");
    }

    response.setHeader("Content-Type", "image/png");
    QRCode.toFileStream(response, this.qrCode);
  }
}
