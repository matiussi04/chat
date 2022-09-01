const socket = io();
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const input = document.querySelector('input');

  if (input.value === '') return;

  for (let i = 0; i < input.value.length; i++) {
    if (input.value[i] != ' ') {
      break;
    } else {
      if (i === input.value.length - 1) {
        return;
      }
    }
  }

  socket.emit('enviar mensagem', { msg: input.value });

  input.value = '';
});

socket.on('receber mensagem', dados => {
  console.log(dados);
  createMessage(dados);
});

function createMessage(dados) {
  const msg = document.createElement('div');
  const chat = document.querySelector('.messages-container');

  msg.innerHTML = dados.msg;
  msg.classList.add('msg');

  if (socket.id === dados.id) {
    msg.classList.add('user');
  } else {
    msg.classList.add('friend');
  }

  chat.appendChild(msg);
}
