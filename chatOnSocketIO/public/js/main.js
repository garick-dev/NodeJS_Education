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
  const chatEl = document.querySelector(".chat-block");
  let textResult = `<div class="content-message"> <span class="user-name">${msg[0]}</span>  <span class="text-message">${msg[1]}</span></div>`;
  msgDivEl.insertAdjacentHTML("beforeend", textResult);
  chatEl.scrollTo(0, chatEl.scrollHeight);
  inputMsgEl.value = "";
});

inputMsgEl.addEventListener("keypress", (ev) => {
  const inputUserNameEl = document.querySelector(".user-name");
  const userName = inputUserNameEl.value;
  socket.emit("userName", userName);
});

let timer = null;

socket.on("typingName", (userName) => {
  const inputUserNameEl = document.querySelector(".user-name");
  let newUserName = inputUserNameEl.value;
  let getUserNameClassEl = document.querySelector(`.${userName}`);
  let resultTyping = "";
  if (getUserNameClassEl === null && userName !== newUserName) {
    resultTyping = `<h3 class="${userName}"> ${userName} typing... </h3>`;
    typingDivEl.insertAdjacentHTML("beforeend", resultTyping);
  }
  const showTyping = (userName) => {
    const getUserNameClassEl = document.querySelector(`.${userName}`);
    if (getUserNameClassEl === null) {
      return;
    }
    console.log(getUserNameClassEl);
    getUserNameClassEl.classList.remove("hidden");
    clearTimeout(timer);
    timer = setTimeout(() => getUserNameClassEl.classList.add("hidden"), 3000);
  };
  showTyping(userName);
});
