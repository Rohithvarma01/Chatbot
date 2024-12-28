const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
});

function displayMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight; // Keep scroll at the bottom
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    displayMessage(message, true); // User message shown
    userInput.value = '';

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }


        const data = await response.json();
        displayMessage(data.response, false); // Bot message
    } catch (error) {
      displayMessage("Error:" + error.message, false)
      console.error("Error sending message:", error);
    }
}
