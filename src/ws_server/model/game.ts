import { generateUniqueId } from "../utils/utils";

export class Game {
  gameId: string;
  players: number[];

  constructor() {
    this.gameId = generateUniqueId().toString();
    this.players = [];
  }

  addPlayer(playerId: number) {
    this.players.push(playerId);
  }
}
