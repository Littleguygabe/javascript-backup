const webSock = require('ws');
const server = new webSock.Server({ port: 8080 });

const clients = new Map(); // Maps socket -> clientId
const channels = new Map(); // Maps clientId -> target clientId

let clientCount = 0;

server.on('connection', (socket) => {
    clientCount++;
    const clientId = clientCount;

    // Map the socket to the clientId
    clients.set(socket, clientId);

    // Handle pairing logic
    if (clientCount === 2) { //still only static for the moment
        // Pair the two clients
        const clientIds = Array.from(clients.values());
        channels.set(clientIds[0], clientIds[1]);
        channels.set(clientIds[1], clientIds[0]);

        console.log(`Clients paired: ${clientIds[0]} <-> ${clientIds[1]}`);
    }

    socket.on('message', (message) => {

        // Find the target client using the channels map
        const targetClientId = channels.get(clientId);
        const targetSocket = Array.from(clients.keys()).find(
            (s) => clients.get(s) === targetClientId
        );

        if (targetSocket && targetSocket.readyState === webSock.OPEN) {
            targetSocket.send(`${message}`);
        }
    });

    socket.on('close', () => {
        console.log(`Client ${clientId} disconnected`);
        // Remove the client from the maps
        clients.delete(socket);
        channels.delete(clientId);

        // Remove the pairing if necessary
        const targetClientId = channels.get(clientId);
        if (targetClientId) {
            channels.delete(targetClientId);
        }
    });
});

console.log('WebSocket server running on ws://localhost:8080');
