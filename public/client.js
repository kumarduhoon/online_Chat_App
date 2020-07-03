const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area')
do {
    name = prompt('Please enter you name:')
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value)
    }
})
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    //append
    appendMessage(msg, "outgoing");
    textarea.value ="";
    scroll();


    // message send to the server

    socket.emit('message',msg);
}
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message')
    let markup = `
     <h4>${msg.user}</h4>
     <p>${msg.message}</P>`

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// recive the message from server

socket.on('message',(msg)=>{


    appendMessage(msg, "incoming");
    scroll();
})





function scroll(){
    messageArea.scrollTop =messageArea.scrollHeight;
}