import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as socketIo from "socket.io";

type Message = {
    from: string;
    text: string;
}

class Server {

    private app: express.Express;
    private server: http.Server;
    private io: socketIo.Server;

    constructor(port: number) {
        this.createApp();
        this.createServer();
        this.createSocket();
        this.setRoute();
        this.listen(port);
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = http.createServer(this.app);
    }

    private createSocket(): void {
        this.io = require('socket.io')(this.server);
    }

    private setRoute(): any {
        this.app.get("/", (req: any, res: any) => {
            res.sendFile(path.join(__dirname, "../view/index.html"));
        });
    }

    private listen(port: number): void {
        this.server.listen(port, () => {
            console.log('server listening on port %s', port);
        })
        this.io.on('connection', (socket: any) => {
            console.log('Connected client on port %s.', port);

            socket.on("chat message", (msg: Message) => {
                this.io.emit('chat message', msg);
                console.log(msg);
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            })
        })
    }

    public close() {
        this.io.close()
        this.server.close()
    }

}

export { Server }
