const socket = io();
const loginFormEl = document.forms.loginForm;
const chatFormEl = document.forms.chatForm;
const inputMsgEl = document.querySelector(".msg");
const chatEl = document.querySelector(".chat-block");


const loginGet = async () => {
    const { data } = await axios.get("/login");
    const name = data.login;
    if (name.length > 1) {
      socket.emit("login", { name }, (uid) => {
      socket.emit("userName", name );
      });
      loginFormEl.classList.add("hidden");
      chatFormEl.classList.remove("hidden");
      chatEl.classList.remove("hidden");
    }
}

const loginPost =  () => {

  loginFormEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const name = document.querySelector("input[name=login").value;
    if (name.length < 1) {
      alert("Введите имя");
      return;
    }
    const formData = new FormData(ev.target);
    const { data } = await axios.post("/login", formData);
    socket.emit("login", { name }, (uid) => {
      // user.id = uid;
    });
    loginFormEl.classList.add("hidden");
    chatFormEl.classList.remove("hidden");
    chatEl.classList.remove("hidden");
    loginPostForTyping();
  });
};

const messagePost = () => {
  chatFormEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const name = document.querySelector("input[name=login").value;
    const text = document.querySelector("input[name=msg").value;
    if (text.length < 1) {
      alert("Введите сообщение");
      return;
    }
    socket.emit("msg", { name, text });
  });
};

const colors = [];

const insertMessageToChat = () => {
  const msgDivEl = document.querySelector(".chat-block__content");
  socket.on("msgToFront", (id, login, text) => {
    const findUser = colors.find((val) => val.uid === id);
    if (findUser === undefined) {
      const color = uniqolor.random().color;
      const user = {
        uid: id,
        name: login,
        color: color,
      };

      colors.push(user);
    }
    const findUserIndex = colors.findIndex((val) => val.uid === id);
    let textResult = `<div class="content-message" style="color: ${colors[findUserIndex].color}">${login} ${text} </div>`;
    msgDivEl.insertAdjacentHTML("beforeend", textResult);
    chatEl.scrollTo(0, chatEl.scrollHeight);
    inputMsgEl.value = "";
  });
};


const loginPostForTyping = async () => {
  const { data } = await axios.get("/login");
  let resultTyping = "";    
  inputMsgEl.addEventListener("keypress",  (ev) => {
    const login = data.login;
    if (login != null || login != "undefined" || login.length > 1) {
      socket.emit("userName", login); 
      socket.on("typingName", (userName) => {
        const typingDivEl = document.querySelector(".chat-block__typing");
        let getUserNameClassEl = document.querySelector(`.${userName}`);
          
        if (getUserNameClassEl === null) {    
          resultTyping = `<h3 class="${userName}"> ${userName} typing... </h3>`;
          typingDivEl.insertAdjacentHTML("beforeend", resultTyping);     
        }   
        else {
          showTyping(userName);;
        }
      });
    } 
  });
}

const showTyping = (userName) => {
  let timer = null;
  const getUserNameClassEl = document.querySelector(`.${userName}`);
  const typingDivEl = document.querySelector(".chat-block__typing");

  if (getUserNameClassEl === null ) {
    return;
  }
  else {
    clearTimeout(timer);   
    timer = setTimeout(() => typingDivEl.removeChild(getUserNameClassEl), 3000);
    }

};

loginGet();
loginPost();
messagePost();
insertMessageToChat();
loginPostForTyping();

