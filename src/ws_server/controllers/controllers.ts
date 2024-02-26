import { roomDb, webSocketDb } from "../utils/utils";
import { userDb } from "../utils/utils";
import { requestTypes } from "../utils/utils";
import { createJsonResponse } from "../utils/utils";
import createUser from "../model/user";
import { createRoomController } from "./createRoomController";
import WebSocket from "ws";
import { RoomUser } from "../utils/interface";

export function updateRoomState() {
  const roomsWithSinglePlayer = Array.from(roomDb.values()).filter(
    (room) => room.roomUsers.length === 1
  );

  const roomData = roomsWithSinglePlayer.map((room) => ({
    roomId: room.gameId,
    roomUsers: room.roomUsers.map((user: RoomUser) => ({
      name: user.name,
      index: user.index,
    })),
  }));

  const response = createJsonResponse(
    requestTypes.UpdateRoom,
    JSON.stringify(roomData)
  );
  Object.values(webSocketDb).forEach((socket: WebSocket) => {
    socket.send(response);
  });
}

export const regController = (id: number, data: string) => {
  const { name, password } = JSON.parse(data);

  const isUsernameExist = userDb.has(name);

  if (!isUsernameExist) {
    const newUser = createUser(id, name, password);
    userDb.set(id, newUser);

    const responseUserData = {
      name: newUser.name,
      index: newUser.index,
      error: false,
      errorText: "",
    };

    const responseUserDataJson = JSON.stringify(responseUserData);

    const response = createJsonResponse(requestTypes.Reg, responseUserDataJson);

    webSocketDb[id].send(response);

    createRoomController(id);

    updateRoomState();
  } else {
    const responseUserData = {
      name,
      index: id,
      error: true,
      errorText: "Username is taken",
    };

    const responseUserDataJson = JSON.stringify(responseUserData);

    const response = createJsonResponse(requestTypes.Reg, responseUserDataJson);

    webSocketDb[id].send(response);
  }
};
