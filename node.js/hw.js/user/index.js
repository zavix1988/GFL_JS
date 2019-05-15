var pharases = require('./ru');

function User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    console.log("Hello, " + who.name);
}
console.log(pharases);

exports.User = User;