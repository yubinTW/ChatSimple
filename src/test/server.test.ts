import { io, Socket } from 'socket.io-client'
import { Server } from '../server'

const options = {
    transports: ['websocket']
    , forceNew: true
};

const port: number = 3000
const socketURL = `http://localhost:${port}`;

let server: Server
let clientA: Socket
let clientB: Socket

type Message = {
    from: string;
    text: string;
}

describe('when client connect', function () {

    beforeAll(() => {
        server = new Server(port)

    })

    afterAll((done) => {
        clientA.on("disconnect", () => {
            console.log("clientA is disconnected")
            clientB.on("disconnect", () => {
                console.log("clientB is disconnected")
                done()
            })
        })
        server.close()
        clientA.close()
        clientB.close()
    })

    test('should make a connection for clientA and clientB', (done) => {
        clientA = io(socketURL, options);

        clientA.on("connect", () => {
            clientB = io(socketURL, options);
            clientB.on("connect", () => {
                expect(clientA.connected)
                expect(clientB.connected)
                done()
            })
        })

    });

    test('clientA could send message to clientB', (done) => {
        let data: Message = {
            from: "clientA",
            text: "Hello"
        }
        clientA.emit('chat message', data);

        clientB.on('chat message', function (data: Message) {
            expect(data).toStrictEqual({
                from: "clientA",
                text: "Hello"
            });
            done()
        });
    });
});
