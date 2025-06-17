// Autenticación simple con localStorage
const authContainer = document.getElementById("authContainer");
const mainContent = document.getElementById("mainContent");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  if (username && password) {
    localStorage.setItem("ikigai_user", username);
    authContainer.style.display = "none";
    mainContent.style.display = "flex";
    loadAllChats();
  }
});

window.addEventListener("load", () => {
  const user = localStorage.getItem("ikigai_user");
  if (user) {
    authContainer.style.display = "none";
    mainContent.style.display = "flex";
    loadAllChats();
  }
});

function sendMessage(chatType) {
  const input = document.getElementById(`input${chatType}`);
  const box = document.getElementById(`chatBox${chatType}`);
  const user = localStorage.getItem("ikigai_user");
  const value = input.value.trim();
  if (!value) return;
  const date = new Date().toLocaleString();
  const msg = `${date} - ${user}: ${value}`;
  let chatData = JSON.parse(localStorage.getItem(`chat_${chatType}`)) || [];
  chatData.push(msg);
  localStorage.setItem(`chat_${chatType}`, JSON.stringify(chatData));
  input.value = "";
  renderChat(chatType, chatData);
}

function loadAllChats() {
  ["General", "Avisos", "Ventas"].forEach(chatType => {
    const chatData = JSON.parse(localStorage.getItem(`chat_${chatType}`)) || [];
    renderChat(chatType, chatData);
  });
}

function renderChat(chatType, messages) {
  const box = document.getElementById(`chatBox${chatType}`);
  box.innerHTML = "";
  messages.forEach(msg => {
    const p = document.createElement("p");
    p.textContent = msg;
    box.appendChild(p);
  });
  box.scrollTop = box.scrollHeight;
}
