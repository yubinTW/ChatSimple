//const chai = require('chai');
const io = require('socket.io-client');
const server = require('../../server');
const options = {
    transports: ['websocket']
    , forceNew: true
};
const socketURL = 'http://localhost:3000';
let clientA = io.connect(socketURL, options);
let clientB = io.connect(socketURL, options);


describe('when client connect', function () {

    test('should make a connection',async() => {
        clientA.on('connect',function(connectClient:any) {
            expect(connectClient).toBe(Object);
        });
      });
    test('should show clients port',async() => {
        clientA.on('connect',function(log:any) {
            expect(log).toBe('Connected client on port 3000');
        });
       });
    test('client could send message', function (done) {
         let data = {msg: "Hello"};
         clientA.emit('chat message', data);
         clientB.on('chat message', function (data:any) {
             expect(data).toBe("Hello");
         });
      });
});
