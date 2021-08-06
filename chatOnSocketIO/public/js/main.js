const socket = io();
const formEl = document.forms.chatForm;
const typingDivEl = document.querySelector(".chat-block__typing");
const msgDivEl = document.querySelector(".chat-block__content");

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
