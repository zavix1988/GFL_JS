var port = 5000;
var express = require('express');
var bodyParser = require('body-parser');
var server = express();

server.use('/', express.static('public'));
server.use(bodyParser.json());

server.get('/test.json', (req, resp) => {
    resp.json({
        test: 'OK'
    });
});

server.post('/set_test', (req, resp) => {
    console.log(req.body);
    resp.json(req.body);
});

server.all('/all_data', (req, resp) => {
    resp.send('<h1>All DATA Ok</h1>')
});

server.listen(port, () => {
    console.log('Server runned on port:', port);
});