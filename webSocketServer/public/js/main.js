const socket = new WebSocket("ws:/localhost:3000");

const formEl = document.forms.chatForm;

formEl.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const data = formData.get("msg");
  socket.send(data);
});

socket.addEventListener("message", (ev) => {
  console.log("Message from server: ", ev.data);
});
