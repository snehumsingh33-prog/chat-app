function logout() {
  localStorage.removeItem("currentUser");
  window.location = "index.html";
}

// Improved chat UI
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
