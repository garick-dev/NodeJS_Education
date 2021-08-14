const socket = io();
const chatFormEl = document.forms.chatForm;
const inputMsgEl = document.querySelector(".msg");
const chatEl = document.querySelector(".chat-block");

const loginPost = () => {
  const loginFormEl = document.forms.loginForm;
  loginFormEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const name = document.querySelector("input[name=first-name").value;
    if (name.length < 1) {
      alert("Введите имя");
      return;
    }
    socket.emit("login", { name }, (uid) => {
      id = uid;
    });
    loginFormEl.classList.add("hidden");
    chatFormEl.classList.remove("hidden");
    chatEl.classList.remove("hidden");
  });
};

const messagePost = () => {
  chatFormEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const name = document.querySelector("input[name=first-name").value;
    const text = document.querySelector("input[name=msg").value;
    if (text.length < 1) {
      alert("Введите сообщение");
      return;
    }
    socket.emit("msg", { name, text });
  });
};

const insertMessageToChat = () => {
  const msgDivEl = document.querySelector(".chat-block__content");
  socket.on("msgToFront", (login, text) => {
    const color = uniqolor.random().color;
    let textResult = `<div class="content-message" style="color: ${color}">${login} ${text} ${id}</div>`;
    msgDivEl.insertAdjacentHTML("beforeend", textResult);
    chatEl.scrollTo(0, chatEl.scrollHeight);
    inputMsgEl.value = "";
  });
};

const loginPostForTyping = () => {
  inputMsgEl.addEventListener("keypress", (ev) => {
    const inputUserNameEl = document.querySelector(".user-name");
    const userName = inputUserNameEl.value;
    socket.emit("userName", userName);
  });
};

const showTypingInChat = () => {
  socket.on("typingName", (userName) => {
    const typingDivEl = document.querySelector(".chat-block__typing");

    const inputUserNameEl = document.querySelector(".user-name");
    let newUserName = inputUserNameEl.value;
    let getUserNameClassEl = document.querySelector(`.${userName}`);
    let resultTyping = "";
    if (getUserNameClassEl === null && userName !== newUserName) {
      resultTyping = `<h3 class="${userName}"> ${userName} typing... </h3>`;
      typingDivEl.insertAdjacentHTML("beforeend", resultTyping);
    }

    showTyping(userName);
  });
};

const showTyping = (userName) => {
  let timer = null;
  const getUserNameClassEl = document.querySelector(`.${userName}`);
  if (getUserNameClassEl === null) {
    return;
  }
  getUserNameClassEl.classList.remove("hidden");
  clearTimeout(timer);
  timer = setTimeout(() => getUserNameClassEl.classList.add("hidden"), 3000);
};

loginPost();
messagePost();
insertMessageToChat();
loginPostForTyping();
showTypingInChat();
