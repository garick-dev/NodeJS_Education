const { v4: uuidv4 } = require("uuid");

const users = [];

const login = (name, sid) => {
  const uid = uuidv4();
  const user = {
    id: uid,
    sid,
    profile: name,
  };
  users.push(user);
  return uid;
};

const findUserSid = () => {};

module.exports = { login };
