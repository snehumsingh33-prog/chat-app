 let users = JSON.parse(localStorage.getItem("users")) || {};
let chats = JSON.parse(localStorage.getItem("chats")) || [];
let currentUser = localStorage.getItem("currentUser");

// Register
function register() {
  let u = ruser.value;
  let p = rpass.value;
  users[u] = p;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered");
}

// Login
function login() {
  let u = luser.value;
  let p = lpass.value;

  if (users[u] === p) {
    localStorage.setItem("currentUser", u);
    location.href = "chat.html";
  } else {
    alert("Wrong");
  }
}

// Send
function send() {
  let to = document.getElementById("to").value;
  let msg = document.getElementById("msg").value;

  chats.push({from: currentUser, to, msg});
  localStorage.setItem("chats", JSON.stringify(chats));

  showChat();
}

// Show chat
function showChat() {
  let box = document.getElementById("chatBox");
  if (!box) return;

  box.innerHTML = "";

  chats.forEach(c => {
    if (c.from === currentUser || c.to === currentUser) {
      let div = document.createElement("div");
      div.className = "msg " + (c.from === currentUser ? "sent" : "received");
      div.innerText = c.from + ": " + c.msg;
      box.appendChild(div);
    }
  });
}

showChat();