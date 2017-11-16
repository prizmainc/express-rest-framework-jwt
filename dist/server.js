"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const indexRoute_1 = require("./routes/public/indexRoute");
const authRoute_1 = require("./routes/public/authRoute");
const adminRoute_1 = require("./routes/admin/adminRoute");
const userRoute_1 = require("./routes/user/userRoute");
const authorization_1 = require("./middlewares/authorization");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.publicRoutes();
        this.authorization();
        this.authorizedRoutes();
        this.api();
    }
    api() {
    }
    config() {
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "hbs");
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser());
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
    publicRoutes() {
        let router;
        router = express.Router();
        indexRoute_1.IndexRoute.create(router);
        authRoute_1.AuthRoute.create(router);
        this.app.use(router);
    }
    authorizedRoutes() {
        let router;
        router = express.Router();
        adminRoute_1.AdminRoute.create(1, router);
        userRoute_1.UserRoute.create(2, router);
        this.app.use(router);
    }
    authorization() {
        let router;
        router = express.Router();
        authorization_1.Authorization.create(router);
        this.app.use(router);
    }
}
exports.Server = Server;
