import {Express} from "express";

import {dbDebug} from './debuggers';
import db from "../knex/db";


const createDbConnection = (app: Express) => {
    dbDebug("Creating database connection pool...");
    try {
        db.select(`*`)
            .from(`knex_migrations`)
            .limit(1)
            .then((r)=> {
                dbDebug("Database connected");
                app.locals.pool = db;
            })
            .catch((r)=> {
                dbDebug(`Connection error!`);
            });

    } catch (err) {
        dbDebug(`Connection error!`);
    }


    // const pool = app.locals.pool;
    // pool.on('connection', function (connection:Connection) {
    //     dbDebug("Connection ID: " + connection.threadId.toString());
    // });
    // pool.on('acquire', function (connection:Connection) {
    //     dbDebug("Acquired Connection ID: " + connection.threadId.toString());
    // });
}

export default createDbConnection;
