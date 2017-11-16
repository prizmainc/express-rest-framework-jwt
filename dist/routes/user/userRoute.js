"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoute_1 = require("../baseRoute");
class UserRoute extends baseRoute_1.BaseRoute {
    static create(role, router) {
        router.get("/user", (req, res, next) => {
            let userRoute = new UserRoute();
            userRoute.roleAuth(role, req, res, next);
            userRoute.index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        res.send('User home page');
    }
}
exports.UserRoute = UserRoute;
