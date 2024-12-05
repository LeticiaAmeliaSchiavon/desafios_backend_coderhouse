const socket = io();

const form = document.getElementById('message-form');
const messagesDiv = document.getElementById('messages');

socket.on('messageLog', (messages) => {
    messagesDiv.innerHTML = messages
        .map((msg) => `<p><strong>${msg.user}:</strong> ${msg.message}</p>`)
        .join('');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;

    socket.emit('newMessage', { user, message });
    form.reset();
});
