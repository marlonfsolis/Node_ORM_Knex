import db from "../knex";
import {IErr} from "../shared/Err";
import {ErrorLogModel, IErrorLogModel} from "../models/ErrorLogModel";
import {Models} from "../models";


export default class IndexRepository {
    constructor() {}

    /**
     * Log Error
     */
    // err:Error, details:string=``
    async logError(errLog: ErrorLogModel) {
        // const errLog = ErrorLogModel.createWithError(err, details);
        await db<IErrorLogModel>(Models.errorLog).insert(errLog);
        const [result] = await db.raw(`SELECT LAST_INSERT_ID() AS errorLogId;`);
        // console.log(result[0].errorLogId);
        errLog.errorLogId = result[0].errorLogId;

        return errLog;
    }
}
