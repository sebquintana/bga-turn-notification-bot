import { Injectable } from "@nestjs/common";
import { Message } from "src/domain/entities/message.entity";
import { MessageService } from "src/domain/ports/message.service";

@Injectable()
export class WhatsappMessageService implements MessageService {
  sendMessage(message: Message): Promise<void> {
    console.log("sending message");
    return Promise.resolve();
  }
}
