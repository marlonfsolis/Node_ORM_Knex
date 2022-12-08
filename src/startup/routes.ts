import {Express, Request, Response, NextFunction} from "express";

import * as IndexController from "../controllers/indexController";
import {debug} from "./debuggers";

import index_routes from "../routes/indexRoute";
import routes_users from "../routes/users";
import permission_routes from "../routes/permissionRoutes";
import group_routes from "../routes/groupRoutes";


const routesLoader = (app: Express) => {

    debug("Loading routes...");

    app.use("/api", index_routes);
    app.use("/api/users", routes_users);
    app.use("/api/permissions", permission_routes);
    app.use("/api/groups", group_routes);

    app.use("*", IndexController.pageNotFound);
    app.use(IndexController.errorNotHandled);

    debug("Routes loaded.");
};



export default routesLoader;
