const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8090 });

wss.broadcast = function (data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

console.log("🔗 WebSocket Server Running on Port 8090");

module.exports = wss;
