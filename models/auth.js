let db = require("./db");
let jwt = require('jsonwebtoken');

authenticate = function (usernameSent, passwordSent, callback) {
    let users = db.users();
    let userAvailable = false;
    let passwordCorrect = false;
    let selectedUser;
    let token;

    users.forEach(function (user) {
        if (user.username === usernameSent) {
            userAvailable = true;
            if (user.password === passwordSent) {
                passwordCorrect = true;
                selectedUser = user;
                return 0;
            }
        }
    });

    if (selectedUser) {
        token = jwt.sign({"roles": selectedUser.roles, "iat": 1422779638}, 'secretkey', {});
    }

    callback(!userAvailable, !passwordCorrect, token);
};

verifyUser = function (token, callback) {

    let tokenWithBarer = token.split(' ');
    // verifies secret and checks expiry date
    jwt.verify(tokenWithBarer[1].trim(), 'secretkey', function(err, decoded) {
        callback(err, decoded);
    });
};

module.exports = authenticate;
module.exports = verifyUser;