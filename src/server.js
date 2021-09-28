"use strict";
const express = require("express");
const path = require("path");
const http = require("http");
class Server {
    constructor() {
        this.port = 3000;
        this.createApp();
        this.createServer();
        this.createSocket();
        this.setRoute();
        this.listen();
    }
    createApp() {
        this.app = express();
    }
    createServer() {
        this.server = http.createServer(this.app);
    }
    createSocket() {
        this.io = require('socket.io')(this.server);
    }
    setRoute() {
        this.app.get("/", (req, res) => {
            res.sendFile(path.resolve("../Chat/view/index.html"));
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            // console.log('server listening on port %s', this.port);
        });
        this.io.on('connection', (socket) => {
            console.log('Connected client on port %s.', this.port);
            socket.on("chat message", (msg) => {
                this.io.emit('chat message', msg);
                console.log(msg);
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}
let server = new Server();
module.exports = server;
//# sourceMappingURL=server.js.map