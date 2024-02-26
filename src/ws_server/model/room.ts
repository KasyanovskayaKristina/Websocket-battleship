import { Game } from "./game";

export class Room {
  gameId: string;
  roomUsers: { index: number; name: string }[];

  constructor(gameId: string, playerId: number) {
    this.gameId = gameId;
    this.roomUsers = [{ index: playerId, name: "" }];
  }

  addUser(user: { index: number; name: string }) {
    this.roomUsers.push(user);
  }
}

export const gameDb: Map<string, Game> = new Map();
