import { generateUniqueId } from "./utils/utils";
import { regController } from "./controllers/controllers";
import { webSocketDb } from "./utils/utils";
import { userDb } from "./utils/utils";
import { server } from "./utils/utils";
import { webServer } from "./utils/utils";
import {
  addUserToRoomController,
  createRoomController,
} from "./controllers/createRoomController";

console.log(webServer);

server.on("connection", (socket) => {
  const id = generateUniqueId();

  socket.on("message", (message) => {
    const { type, data } = JSON.parse(message.toString());
    console.log(`Received: [${type}] request`);

    webSocketDb[id] = socket;

    switch (type) {
      case "reg":
        regController(id, data);
        console.log(`${JSON.parse(data).name} is connected`);
        userDb.set(id, { name: JSON.parse(data).name });
        break;
      case "create_room":
        createRoomController(id);
        console.log(`Room ${id}`);
        break;
      case "add_user_to_room":
        addUserToRoomController(id, data);
        console.log(`User Room ${id}`);
        break;
      default:
        console.log(`Error check type handler: ${type}`);
    }
  });

  socket.on("close", () => {
    console.log(`Connection  ${id} (${userDb.get(id)?.name}) is closed`);
    userDb.delete(id);
    socket.close();
  });
});
