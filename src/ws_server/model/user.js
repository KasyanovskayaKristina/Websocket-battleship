function createUser(index, name, password) {
  return {
    index: index,
    name: name,
    password: password,
    wins: 0,
  };
}

export default createUser;
