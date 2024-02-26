import { WebSocketServer } from "ws";
import { WebSocket } from "ws";

export const webSocketDb: { [key: number]: WebSocket } = {};
export const userDb = new Map();
export const server = new WebSocketServer({ port: 3000 });
export const webServer = "WebSocket server is running on ws://localhost:3000";

let responseId = 0;

export const requestTypes = {
  Reg: "reg",
};

export const createJsonResponse = (type: string, data: string) => {
  const jsonResponse = { type, data, id: responseId };
  return JSON.stringify(jsonResponse);
};

export const generateUniqueId = () => {
  responseId += 1;
  return responseId;
};
