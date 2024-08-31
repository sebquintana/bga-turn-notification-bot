export class Message {
  private constructor(
    readonly to: string,
    readonly message: string
  ) {}

  static create(player: string, game: string): Message {
    const message = `Es el turno de ${player} en ${game}`;
    return new Message(player, message);
  }
}
