import { Injectable } from "@nestjs/common";
import { MessageService } from "domain/ports/message.service";
import axios from "axios";

@Injectable()
export class WhatsappMessageService implements MessageService {
  private readonly templateName = "bga_turn_notification";
  private readonly apiVersion = "v20.0";
  private readonly phoneNumberId = "creds en notion";
  private readonly apiToken = "creds en notion";

  async sendTurnMessage(
    playerPhoneNumber: string,
    table: string,
    gameName: string
  ): Promise<void> {
    console.log("sending message");
    var data = this.getTurnMessageInput(playerPhoneNumber, table, gameName);

    var sendMessageRequest = {
      method: "post",
      url: `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`,
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      await axios(sendMessageRequest);
      console.log("Message sent successfully: ", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  getTurnMessageInput(recipient: string, table: string, gameName: string) {
    return JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: "template",
      template: {
        name: this.templateName,
        language: {
          code: "es_AR",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: gameName,
              },
            ],
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: [
              {
                type: "text",
                text: table,
              },
            ],
          },
        ],
      },
    });
  }
}
