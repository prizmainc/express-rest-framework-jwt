"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var indexRoute_1 = require("./routes/public/indexRoute");
var authRoute_1 = require("./routes/public/authRoute");
var adminRoute_1 = require("./routes/admin/adminRoute");
var userRoute_1 = require("./routes/user/userRoute");
var authorization_1 = require("./middlewares/authorization");
/**
 * The server.
 *
 * @class Server
 */
var Server = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //add routes
        this.publicRoutes();
        this.authorization();
        this.authorizedRoutes();
        //add api
        this.api();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    Server.prototype.api = function () {
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    Server.prototype.config = function () {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        //configure hbs
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "hbs");
        //mount logger
        this.app.use(logger("dev"));
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        //mount cookie parser middleware
        this.app.use(cookieParser());
        //mount override?
        this.app.use(methodOverride());
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    /**
     * Create and return Router.
     *
     * @class Server
     * @method config
     * @return void
     */
    Server.prototype.publicRoutes = function () {
        var router;
        router = express.Router();
        //IndexRoute
        indexRoute_1.IndexRoute.create(router);
        authRoute_1.AuthRoute.create(router);
        //use router middleware
        this.app.use(router);
    };
    Server.prototype.authorizedRoutes = function () {
        var router;
        router = express.Router();
        adminRoute_1.AdminRoute.create(1, router);
        userRoute_1.UserRoute.create(2, router);
        //use router middleware
        this.app.use(router);
    };
    Server.prototype.authorization = function () {
        var router;
        router = express.Router();
        authorization_1.Authorization.create(router);
        this.app.use(router);
    };
    return Server;
}());
exports.Server = Server;
