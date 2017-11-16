"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoute_1 = require("../baseRoute");
const authModel_1 = require("../../models/authModel");
class AuthRoute extends baseRoute_1.BaseRoute {
    static create(router) {
        router.get("/auth", (req, res, next) => {
            new AuthRoute().auth(req, res, next);
        });
        router.get("/auth2", (req, res, next) => {
            new AuthRoute().auth2(req, res, next);
        });
    }
    constructor() {
        super();
    }
    auth(req, res, next) {
        if (req.param('username') === undefined || req.param('password') === undefined || req.param('username').trim() === '' || req.param('password').trim() === '') {
            res.send('username & password required');
        }
        authModel_1.AuthModel.authenticate(req.param('username'), req.param('password'), function (userNotAvailable, passwordIncorrect, token) {
            if (userNotAvailable) {
                res.send('no user available');
            }
            if (passwordIncorrect) {
                res.send('error password');
            }
            res.json({
                status: 'success',
                token: token
            });
        });
    }
    auth2(req, res, next) {
        authModel_1.AuthModel.authenticate2(req.param('username'), req.param('password'), function (userNotAvailable, passwordIncorrect, token) {
            if (userNotAvailable) {
                res.send('no user available');
            }
            if (passwordIncorrect) {
                res.send('error password');
            }
            res.json({
                status: 'success',
                token: token
            });
        });
    }
}
exports.AuthRoute = AuthRoute;
