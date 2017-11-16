"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseRoute_1 = require("../baseRoute");
var authModel_1 = require("../../models/authModel");
var AuthRoute = /** @class */ (function (_super) {
    __extends(AuthRoute, _super);
    /**
     * Constructor
     *
     * @class AuthRoute
     * @constructor
     */
    function AuthRoute() {
        return _super.call(this) || this;
    }
    /**
     * Create the auth routes.
     *
     * @class AuthRoute
     * @method create
     * @static
     */
    AuthRoute.create = function (router) {
        router.get("/auth", function (req, res, next) {
            new AuthRoute().auth(req, res, next);
        });
        router.get("/auth2", function (req, res, next) {
            new AuthRoute().auth2(req, res, next);
        });
    };
    /**
     * The home page route.
     *
     * @class AuthRoute
     * @method auth
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    AuthRoute.prototype.auth = function (req, res, next) {
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
    };
    AuthRoute.prototype.auth2 = function (req, res, next) {
        /* if (req.param('username') === undefined || req.param('password') === undefined || req.param('username').trim() === '' || req.param('password').trim() === '') {
             res.send('username & password required');
         }*/
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
    };
    return AuthRoute;
}(baseRoute_1.BaseRoute));
exports.AuthRoute = AuthRoute;
