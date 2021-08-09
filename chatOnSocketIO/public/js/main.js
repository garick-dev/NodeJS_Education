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
  let getUserNameClassEl = document.querySelector(`.${userName}`);
  if (getUserNameClassEl === null && userName !== newUserName) {
    resultTyping += `<h3 class="${userName}"> ${userName} typing... </h3>`;
    typingDivEl.innerHTML = resultTyping;
  }
  showTyping(userName);
});

let timer = null;
// let timer2 = null;

const showTyping = (userName) => {
  const userNameEl = document.querySelectorAll("h3");
  const arrUserName = Array.prototype.slice.call(userNameEl);
  let getUserNameClassEl = document.querySelector(`.${userName}`);
  for (let i = 0; i <= arrUserName.length - 1; i++) {
    if (
      arrUserName[i].classList.contains("hidden") === false ||
      getUserNameClassEl === null
    ) {
      clearTimeout(timer);
      timer = setTimeout(() => arrUserName[i].classList.add("hidden"), 3000);
      console.log("ADD");
    } else {
      if (getUserNameClassEl.classList.contains("hidden") === true) {
        getUserNameClassEl.classList.remove("hidden");
        console.log("REMOVE");
      }
    }
  }
};

// clearTimeout(timer);
// timer = setTimeout(() => {}, 2000);

// clearTimeout(timer);
// // timer = setTimeout(() => {
// for (let i = 0; i <= arrUserName.length - 1; i++) {
//   if (arrUserName[i].classList.contains("hidden") == false) {
//     // clearTimeout(timer2);
//     timer = setTimeout(() => arrUserName[i].classList.add("hidden"), 3000);

//   }
// }
