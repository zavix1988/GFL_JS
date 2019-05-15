//console.log('Hello, node');
//require libs
var http = require('http'); //http serv lib
var url = require('url'); //parsing url string lib
var fs = require('fs'); //file system lib

//create HTTP serv
var server = new http.Server();
server.listen(8080);


server.on('request', (request, response) => {
    // Read file
    fs.readFile('./index.html', (error, data) => {
        //server response
        response.end(data);
    })
})

//////////////HTTP END////////////////
var randomcolor = require('randomcolor');
var ws = require('ws');

// creating WebSocket server
const wsServer = new ws.Server({
    port: 8800
});

var counter = 0;
var users = {};

//Waiting client
wsServer.on('connection', (client) => {
    var id = counter++;
    var user = {
        id: id,
        color: randomcolor(),
        position: {
            top: 0,
            left:0
        }
    }
    users[id] = user;

    var all_users_json = JSON.stringify({
        type: 'all_users',
        info: users
    });
    client.send(all_users_json);


    wsServer.clients.forEach((cl) => {
        var message = {
            type: 'new_user',
            info: user
        };
        var message_json_string = JSON.stringify(message);
        cl.send(message_json_string);
    });

    //close connection event
    client.on('close', () => {
        delete users[id];
        // message for all clients about removing client
        wsServer.clients.forEach((cl) => {
            var message = {
                type: 'remove_user',
                info: id
            };
            var message_json_string = JSON.stringify(message);
            cl.send(message_json_string);
        });
    });

    //Waiting client message
    client.on('message', (message) => {
        //if client sending message 'ping'
        if (message === 'ping') {
            //server ansver 'pong'
            client.send('pong');
        }
        try {
            var data = JSON.parse(message);
            switch (data.type) {
                case 'move':
                    switch (data.info) {
                        case 'Up':
                            users[id].position.top--;
                            break;
                            case 'Down':
                            users[id].position.top++;
                            break;
                            case 'Left':
                            users[id].position.left--;
                            break;
                            case 'Right':
                            users[id].position.left++;
                            break;
                    }
                    wsServer.clients.forEach((cl) => {
                        var data_json = JSON.stringify({
                            type: 'update_user',
                            info: users[id]
                        });
                        cl.send(data_json);
                    });
                break;

            }
        } catch (error) {
            
        }
    })
})