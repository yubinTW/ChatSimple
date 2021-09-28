var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//const chai = require('chai');
const io = require('socket.io-client');
const server = require('../../server');
const options = {
    transports: ['websocket'],
    forceNew: true
};
const socketURL = 'http://localhost:3000';
let Client = io.connect(socketURL, options);
let Client1 = io.connect(socketURL, options);
describe('when client connect', function () {
    test('should make a connection', () => __awaiter(this, void 0, void 0, function* () {
        Client.on('connect', function (connectClient) {
            expect(connectClient).toBe(Object);
        });
    }));
    test('should show clients port', () => __awaiter(this, void 0, void 0, function* () {
        Client.on('connect', function (log) {
            expect(log).toBe('Connected client on port 3000');
        });
    }));
    test('User send message to another', function (done) {
        let data = { msg: "Hello" };
        Client.emit('chat message', data);
        Client1.on('chat message', function (data) {
            expect(data).toBe("Hello");
        });
    });
});
//# sourceMappingURL=server.test.js.map