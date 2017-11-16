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
/**
 * / route
 *
 * @class User
 */
var IndexRoute = /** @class */ (function (_super) {
    __extends(IndexRoute, _super);
    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    function IndexRoute() {
        return _super.call(this) || this;
    }
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    IndexRoute.create = function (router) {
        router.get("/", function (req, res, next) {
            new IndexRoute().index(req, res, next);
        });
    };
    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    IndexRoute.prototype.index = function (req, res, next) {
        //set custom title
        this.title = "Home | express-rest-jwt-type-fw";
        //set message
        var options = {
            "message": "Welcome to express-rest-jwt-type-fw"
        };
        //render template
        this.render(req, res, "index", options);
    };
    return IndexRoute;
}(baseRoute_1.BaseRoute));
exports.IndexRoute = IndexRoute;
