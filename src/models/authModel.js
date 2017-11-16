"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var oracle = require("oracledb");
var config = {
    user: "fmsoradbadmin",
    password: "Penola3#Craft",
    connectString: "fmsoradbins.c5ya5a8qzhtp.ap-southeast-2.rds.amazonaws.com:1521/FMSDB"
};
var AuthModel = /** @class */ (function () {
    function AuthModel() {
    }
    AuthModel.authenticate = function (usernameSent, passwordSent, callback) {
        var users = [
            { username: 'hudson', password: '1', roles: [1, 2] },
            { username: 'hugo', password: '1', roles: [1] },
            { username: 'michel', password: '1', roles: [2] }
        ];
        var roles = { 1: 'admin', 2: 'user' };
        var userAvailable = false;
        var passwordCorrect = false;
        var selectedUser;
        var token;
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
    };
    AuthModel.verifyUser = function (token, callback) {
        var tokenWithBarer = token.split(' ');
        // verifies secret and checks expiry date
        jwt.verify(tokenWithBarer[1].trim(), 'secretkey', function (err, decoded) {
            callback(err, decoded);
        });
    };
    ;
    AuthModel.authenticate2 = function (usernameSent, passwordSent, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 7]);
                        return [4 /*yield*/, oracle.getConnection(config)];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.execute('select USERNAME,PASSWORD_HASH,ROLES from USER_INFO')];
                    case 2:
                        result = _a.sent();
                        console.log(result.rows[0]);
                        return [3 /*break*/, 7];
                    case 3:
                        err_1 = _a.sent();
                        console.log('Ouch!', err_1);
                        return [3 /*break*/, 7];
                    case 4:
                        if (!conn) return [3 /*break*/, 6];
                        return [4 /*yield*/, conn.close()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [7 /*endfinally*/];
                    case 7:
                        callback(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthModel;
}());
exports.AuthModel = AuthModel;
