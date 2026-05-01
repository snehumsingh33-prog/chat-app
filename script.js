let users = JSON.parse(localStorage.getItem("users")) || {};
let chats = JSON.parse(localStorage.getItem("chats")) || [];
let currentUser = localStorage.getItem("currentUser");

// Register
function register() {
  let u = document.getElementById("ruser")?.value.trim();
  let p = document.getElementById("rpass")?.value.trim();

  if (!u || !p) return alert("Enter details");

  users[u] = p;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered");
}

// Login
function login() {
  let u = document.getElementById("luser")?.value.trim();
  let p = document.getElementById("lpass")?.value.trim();

  if (users[u] === p) {
    localStorage.setItem("currentUser", u);
    window.location = "chat.html";
  } else {
    alert("Wrong");
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location = "index.html";
}

// Send message
function send() {
  let to = document.getElementById("to")?.value.trim();
  let msg = document.getElementById("msg")?.value.trim();

  if (!to || !msg) return;

  chats.push({ from: currentUser, to, msg });
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
