document.addEventListener("DOMContentLoaded", function () {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {

        // Parse the position data
        const [x, y] = event.data.split(',');
        
        // Update the canvas with the received coordinates
        updatePath(x, y);
    };

    // Function to send messages through the WebSocket
    function sendMessage(message) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    }

    // Expose the sendMessage function to be called from getPos.js
    window.sendMessage = sendMessage;
});
