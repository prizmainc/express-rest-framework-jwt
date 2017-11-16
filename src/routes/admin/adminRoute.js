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
var AdminRoute = /** @class */ (function (_super) {
    __extends(AdminRoute, _super);
    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    function AdminRoute() {
        return _super.call(this) || this;
    }
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    AdminRoute.create = function (role, router) {
        router.get("/admin", function (req, res, next) {
            var adminRoute = new AdminRoute();
            adminRoute.roleAuth(role, req, res, next);
            adminRoute.index(req, res, next);
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
    AdminRoute.prototype.index = function (req, res, next) {
        res.send('Admin home page');
    };
    return AdminRoute;
}(baseRoute_1.BaseRoute));
exports.AdminRoute = AdminRoute;
