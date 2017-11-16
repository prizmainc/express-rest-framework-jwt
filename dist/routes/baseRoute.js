"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRoute {
    constructor() {
        this.title = "express-rest-jwt-type-fw";
        this.scripts = [];
    }
    addScript(src) {
        this.scripts.push(src);
        return this;
    }
    render(req, res, view, options) {
        res.locals.BASE_URL = "/";
        res.locals.scripts = this.scripts;
        res.locals.title = this.title;
        res.render(view, options);
    }
    roleAuth(role, req, res, next) {
        if (req.param['decoded'].roles.indexOf(role) !== -1) {
            next();
        }
        else {
            res.status(403).send('this page is not granted');
        }
    }
}
exports.BaseRoute = BaseRoute;
