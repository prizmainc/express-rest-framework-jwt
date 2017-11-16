"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoute_1 = require("../baseRoute");
class AdminRoute extends baseRoute_1.BaseRoute {
    static create(role, router) {
        router.get("/admin", (req, res, next) => {
            let adminRoute = new AdminRoute();
            adminRoute.roleAuth(role, req, res, next);
            adminRoute.index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        res.send('Admin home page');
    }
}
exports.AdminRoute = AdminRoute;
