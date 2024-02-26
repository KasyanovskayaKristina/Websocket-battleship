import { WebSocketServer } from "ws";
import { WebSocket } from "ws";

export const webSocketDb: { [key: number]: WebSocket } = {};
export const userDb = new Map();
export const roomDb = new Map();
export const server = new WebSocketServer({ port: 3000 });
export const webServer = "WebSocket server is running on ws://localhost:3000";

let responseId = 0;

export const requestTypes = {
  Reg: "reg",
  CreateRoom: "create_room",
  UpdateRoom: "update_room",
  CreateGame: "create_game",
  AddUserToRoom: "add_user_to_room",
};

export const createJsonResponse = (type: string, data: string) => {
  const jsonResponse = { type, data, id: responseId };
  return JSON.stringify(jsonResponse);
};

export const generateUniqueId = () => {
  responseId += 1;
  return responseId;
};
