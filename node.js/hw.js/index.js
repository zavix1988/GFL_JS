var user = require('./user');

var vasya = new user.User("Vasilij");
var petya = new user.User("Petro");

vasya.hello(petya);

console.log(module);