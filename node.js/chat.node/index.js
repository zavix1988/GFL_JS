var http = require('http');
var fs = require('fs');
var url = require('url');
var ws = require('ws');
/* ======================http serv============================= */
var server = new http.Server();
server.on('request', (req, res) => {
    let urlObj = url.parse(req.url, true);
    fs.readFile('./public/index.html', (err, data) => {
        res.end(data);
    });
})
server.listen(5000);
/* ======================Websocket============================= */
var clients = {};
var messages = require('./data/messages');
var counter = 0;
var wss = new ws.Server({port: 5555});

wss.on('connection', (wsc, request) => {
    //console.log(request.headers.cookie);
    let id = counter++;
    clients[id] = wsc;
    wsc.on('message', (message) => {
        messages.push(message);
        for (let cid in clients) {
            let client = clients[cid];
            client.send(JSON.stringify({
                type: 'message',
                message
            }));
        }
        /* 
            wss.clients.forEach((client) => {
                client.send(JSON.stringify({
                    type: 'message',
                    message
                }));
            })
        */
    });

    wsc.on('close', () => {
        console.log('connect close');
        // clearInterval(timer);
        delete clients[id];

    })

    wsc.send(JSON.stringify({
        type: 'messages',
        messages
    }));


    /* let timer = setInterval(() => {
        try {
            wsc.send(JSON.stringify({
                type: 'memoryInfo',
                data: process.memoryUsage()
            }))
        } catch (e) {   }
    }, 4); */

    // Example disconnect
    /* setTimeout(() => {
        wsc.close()
    }, 5000) */
})

setInterval(() => {
    fs.writeFile('./data/messages.json', JSON.stringify(messages), (err) => {if (err) console.log('error',err)});
}, 1000);