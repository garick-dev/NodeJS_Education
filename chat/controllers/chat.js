const { v4: uuidv4 } = require("uuid");
const clone = require("clone");

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

const findUserSid = (sid) => {
  const findUser = users.find((people) => people.sid === sid);
  return clone(findUser);
};

module.exports = { login, findUserSid };
