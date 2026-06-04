import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 7878 });

const clients = [];

wss.on("connection", (ws) => {
    console.log("Client connected");

    clients.push(ws);

    ws.on("message", (data) => {
        console.log("Message from client:", data.toString());
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        clients.splice(clients.indexOf(ws), 1);
    });

    ws.onerror = () => {
        console.log("WebSocket error occurred");
    };
});

export function broadcast(message) {
    clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(message));
        }
    });
}
