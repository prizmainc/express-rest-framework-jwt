"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authModel_1 = require("../models/authModel");
/**
 * / route
 *
 * @class User
 */
var Authorization = /** @class */ (function () {
    function Authorization() {
    }
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    Authorization.create = function (router) {
        router.use(function (req, res, next) {
            new Authorization().authorize(req, res, next);
        });
    };
    Authorization.prototype.authorize = function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.param('token') || req.headers['authorization'];
        if (token) {
            authModel_1.AuthModel.verifyUser(token, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' + err });
                }
                else {
                    req.param['decoded'] = decoded; //save to request for use in other routes
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
    };
    return Authorization;
}());
exports.Authorization = Authorization;
