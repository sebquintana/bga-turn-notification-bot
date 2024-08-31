import { Message } from "../entities/message.entity";

export interface MessageService {
  sendMessage(message: Message): Promise<void>;
}
