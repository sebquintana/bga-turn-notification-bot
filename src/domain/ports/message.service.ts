export interface MessageService {
  sendTurnMessage(
    playerPhoneNumber: string,
    table: string,
    gameName: string
  ): Promise<void>;
}
