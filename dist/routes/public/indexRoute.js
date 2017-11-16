"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoute_1 = require("../baseRoute");
class IndexRoute extends baseRoute_1.BaseRoute {
    static create(router) {
        router.get("/", (req, res, next) => {
            new IndexRoute().index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        this.title = "Home | express-rest-jwt-type-fw";
        let options = {
            "message": "Welcome to express-rest-jwt-type-fw"
        };
        this.render(req, res, "index", options);
    }
}
exports.IndexRoute = IndexRoute;
