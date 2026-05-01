 function login() {
  let u = document.getElementById("luser").value.trim();
  let p = document.getElementById("lpass").value.trim();

  if (users[u] === p) {
    localStorage.setItem("currentUser", u);

    // FORCE REDIRECT
    window.location.href = "chat.html";
  } else {
    alert("Wrong Username or Password");
  }
}
