import { webSocketDb } from "../utils/utils.js";
import { userDb } from "../utils/utils.js";
import { requestTypes } from "../utils/utils.js";
import { createJsonResponse } from "../utils/utils.js";
import createUser from "../model/user.js";

export const regController = (id, data) => {
  const { name, password } = JSON.parse(data);

  const isUsernameExist = userDb.has(name);

  const newUser = new createUser(id, name, password);
  userDb.set(id, newUser);

  const responseUserData = {
    name: newUser.name,
    index: newUser.index,
    error: isUsernameExist,
    errorText: isUsernameExist ? "Username is taken" : "",
  };

  const responseUserDataJson = JSON.stringify(responseUserData);

  const response = createJsonResponse(requestTypes.Reg, responseUserDataJson);

  webSocketDb[id].send(response);
};
