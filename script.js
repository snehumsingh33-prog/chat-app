// Load saved data (MEMORY)
let users = JSON.parse(localStorage.getItem("users")) || {};
let chats = JSON.parse(localStorage.getItem("chats")) || [];
let currentUser = localStorage.getItem("currentUser");

// AUTO LOGIN (memory)
if (currentUser && window.location.pathname.includes("index.html")) {
  window.location.href = "chat.html";
}

// REGISTER (save in memory)
function register() {
  let u = document.getElementById("ruser").value.trim();
  let p = document.getElementById("rpass").value.trim();

  if (!u || !p) return alert("Enter details");

  if (users[u]) return alert("User already exists");

  users[u] = p;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered Successfully");
}

// LOGIN (save session)
function login() {
  let u = document.getElementById("luser").value.trim();
  let p = document.getElementById("lpass").value.trim();

  if (users[u] === p) {
    localStorage.setItem("currentUser", u);
    window.location.href = "chat.html";
  } else {
    alert("Wrong Username or Password");
  }
}

// LOGOUT (clear session only)
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// SEND MESSAGE (save chat memory)
function send() {
  let to = document.getElementById("to").value.trim();
  let msg = document.getElementById("msg").value.trim();

  if (!to || !msg) return;

  chats.push({
    from: currentUser,
    to: to,
    msg: msg,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("chats", JSON.stringify(chats));

  showChat();
}

// SHOW CHAT (load memory)
function showChat() {
  let box = document.getElementById("chatBox");
  if (!box) return;

  box.innerHTML = "";

  chats.forEach(c => {
    if (c.from === currentUser || c.to === currentUser) {
      let div = document.createElement("div");

      div.className = "msg " + (c.from === currentUser ? "sent" : "received");

      div.innerText =
        c.from + ": " + c.msg + " (" + c.time + ")";

      box.appendChild(div);
    }
  });
}

// CLEAR CHAT (optional memory control)
function clearChat() {
  chats = [];
  localStorage.setItem("chats", JSON.stringify(chats));
  showChat();
}

// LOAD CHAT ON PAGE OPEN
showChat();