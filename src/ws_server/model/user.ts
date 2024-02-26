function createUser(index: number, name: string, password: string) {
  return {
    index: index,
    name: name,
    password: password,
    wins: 0,
  };
}

export default createUser;
