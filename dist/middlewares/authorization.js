"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authModel_1 = require("../models/authModel");
class Authorization {
    static create(router) {
        router.use((req, res, next) => {
            new Authorization().authorize(req, res, next);
        });
    }
    authorize(req, res, next) {
        let token = req.body.token || req.param('token') || req.headers['authorization'];
        if (token) {
            authModel_1.AuthModel.verifyUser(token, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' + err });
                }
                else {
                    req.param['decoded'] = decoded;
                    next();
                }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
        next();
    }
}
exports.Authorization = Authorization;
