import {Express} from "express";

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

    app.use("*", (req, res) => { res.redirect(`/api/not-found`) });

    debug("Routes loaded.");
};



export default routesLoader;
