import db from "../knex";
import {ErrorLogModel, IErrorLogModel} from "../models/ErrorLogModel";
import {Models} from "../models";


export default class IndexRepository {
    constructor() {}

    /**
     * Log Error
     */
    async logError(errLog: ErrorLogModel) {
        await db<IErrorLogModel>(Models.errorLog).insert(errLog);
        const [result] = await db.raw(`SELECT LAST_INSERT_ID() AS errorLogId;`);
        errLog.errorLogId = result[0].errorLogId;

        return errLog;
    }
}
