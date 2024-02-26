import { webSocketDb } from "../utils/utils";
import { userDb } from "../utils/utils";
import { requestTypes } from "../utils/utils";
import { createJsonResponse } from "../utils/utils";
import createUser from "../model/user";

export const regController = (id: number, data: string) => {
  const { name, password } = JSON.parse(data);

  const isUsernameExist = userDb.has(name);

  const newUser = createUser(id, name, password);
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
