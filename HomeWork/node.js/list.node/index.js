var port = 8080;
var express = require('express');
var bodyParser = require('body-parser');
var server = express();

server.use('/', express.static('public'));
server.use(bodyParser.json());

var messages = []

server.post('/send', (req, resp) => {
     let message = req.body;
     messages.push(message);
     //console.log(messages);

});

server.get('/get', (req, resp) => {
    resp.json(messages);
});


server.listen(port, () => {
    console.log('Server runned on port:', port);
});