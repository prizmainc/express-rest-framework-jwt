"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const oracle = require("oracledb");
const config = {
    user: "fmsoradbadmin",
    password: "Penola3#Craft",
    connectString: "fmsoradbins.c5ya5a8qzhtp.ap-southeast-2.rds.amazonaws.com:1521/FMSDB"
};
class AuthModel {
    static authenticate(usernameSent, passwordSent, callback) {
        let users = [
            { username: 'hudson', password: '1', roles: [1, 2] },
            { username: 'hugo', password: '1', roles: [1] },
            { username: 'michel', password: '1', roles: [2] }
        ];
        let roles = { 1: 'admin', 2: 'user' };
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
            token = jwt.sign({ "roles": selectedUser.roles, "iat": 1422779638 }, 'secretkey', {});
        }
        callback(!userAvailable, !passwordCorrect, token);
    }
    static verifyUser(token, callback) {
        let tokenWithBarer = token.split(' ');
        jwt.verify(tokenWithBarer[1].trim(), 'secretkey', function (err, decoded) {
            callback(err, decoded);
        });
    }
    ;
    static authenticate2(usernameSent, passwordSent, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield oracle.getConnection(config);
                const result = yield conn.execute('select USERNAME,PASSWORD_HASH,ROLES from USER_INFO');
                console.log(result.rows[0]);
            }
            catch (err) {
                console.log('Ouch!', err);
            }
            finally {
                if (conn) {
                    yield conn.close();
                }
            }
            callback(true);
        });
    }
}
exports.AuthModel = AuthModel;
