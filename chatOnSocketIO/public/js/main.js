const socket = io();
const formEl = document.forms.chatForm;
const typingDivEl = document.querySelector(".chat-block__typing");
const msgDivEl = document.querySelector(".chat-block__content");
const inputMsgEl = document.querySelector(".msg");

formEl.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const data = [];
  for (let value of formData.values()) {
    data.push(value);
  }

  socket.emit("msg", data);
});

socket.on("msgToFront", (msg) => {
  let textResult = `<div class="content-message"> <span class="user-name">${msg[0]}</span>  <span class="text-message">${msg[1]}</span></div>`;
  msgDivEl.innerHTML += textResult;
});

inputMsgEl.addEventListener("keypress", (ev) => {
  const inputUserNameEl = document.querySelector(".user-name");
  const userName = inputUserNameEl.value;
  socket.emit("userName", userName);
});

let resultTyping = "";

socket.on("typingName", (userName) => {
  const inputUserNameEl = document.querySelector(".user-name");
  let newUserName = inputUserNameEl.value;
  const userNameEl = document.querySelector(`.${userName}`);
  if (userNameEl === null && userName !== newUserName) {
    resultTyping += `<h3 class="${userName}"> ${userName} typing... </h3>`;
    typingDivEl.innerHTML = resultTyping;
    console.log("Условие 1");
  }
  showTyping(userName);
});

let timer = null;

const showTyping = (userName) => {
  const userNameEl = document.querySelectorAll("h3");
  console.log(userNameEl);
  const arrUserName = Array.prototype.slice.call(userNameEl);
  console.log(arrUserName);
  for (let i = 0; i <= arrUserName.length - 1; i++) {
    console.log(arrUserName[i]);
  }
  // userNameEl.classList.remove("hidden");
  clearTimeout(timer);
  timer = setTimeout(() => {}, 3000);
};
