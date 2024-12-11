const socket = io();

const chatForm = document.getElementById('chatForm');
const messagesDiv = document.getElementById('messages');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = document.getElementById('user').value;
  const message = document.getElementById('message').value;

  socket.emit('newMessage', { user, message });
  document.getElementById('message').value = '';
});

socket.on('messages', (messages) => {
  messagesDiv.innerHTML = messages
    .map(msg => `<p><strong>${msg.user}:</strong> ${msg.message}</p>`)
    .join('');
});
