var list = require('./list');
var counter = 0;


setInterval(function(){
    console.log(counter++);
}, 1000)

console.log(list);