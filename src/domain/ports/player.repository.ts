import { Player } from "../entities/player.vo";

export interface PlayerRepository {
  findByBgaNickName(bgaNickName: string): Promise<Player | null>;
}
