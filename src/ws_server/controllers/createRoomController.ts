import { Room } from "../model/room";
import {
  createJsonResponse,
  generateUniqueId,
  requestTypes,
  roomDb,
  userDb,
  webSocketDb,
} from "../utils/utils";
import { updateRoomState } from "./controllers";

export const createRoomController = (id: number) => {
  const gameId = generateUniqueId().toString();
  const playerId = generateUniqueId();

  const room = new Room(gameId, playerId);
  const { index, name } = userDb.get(id);

  room.addUser({ index, name });

  roomDb.set(gameId, room);

  const responseData = { gameId, playerId };
  const responseJson = JSON.stringify(responseData);
  const response = createJsonResponse(requestTypes.CreateRoom, responseJson);

  webSocketDb[id].send(response);

  updateRoomState();
};

export const addUserToRoomController = (id: number, data: string) => {
  const { indexRoom } = JSON.parse(data);
  const room = roomDb.get(indexRoom);

  if (room) {
    const { index, name } = userDb.get(id);
    room.addUser({ index, name });

    const newGameId = generateUniqueId().toString();
    const newPlayerId = generateUniqueId();

    const newGameData = { idGame: newGameId, idPlayer: newPlayerId };
    const newGameJson = JSON.stringify(newGameData);
    const newGameResponse = createJsonResponse(
      requestTypes.CreateGame,
      newGameJson
    );

    room.roomUsers.forEach(({ index }: { index: number }) => {
      webSocketDb[index].send(newGameResponse);
    });

    roomDb.delete(indexRoom);

    //updateRoomState();
  } else {
    console.log(`Room with index ${indexRoom} not found`);
  }
};
