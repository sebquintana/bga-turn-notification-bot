import { Injectable } from "@nestjs/common";
import { MessageService } from "domain/ports/message.service";

@Injectable()
export class MockWhatsappMessageService implements MessageService {
  async sendTurnMessage(
    playerPhoneNumber: string,
    table: string,
    gameName: string
  ): Promise<void> {
    console.log("sending message");
    console.log(
      `Message sent successfully to ${playerPhoneNumber} to play ${gameName} in ${table}`
    );
  }
}
