import {Err} from "../shared/Err";

export interface IErrorLogModel {
    errorLogId: number,
    errorMessage: string,
    errorDetail: string,
    errorDate: Date
}

export class ErrorLogModel implements IErrorLogModel {
    public errorLogId: number;
    public errorMessage: string;
    public errorDetail: string;
    public errorStack: string = ``;
    public errorDate: Date;

    constructor(errMsg:string, errDetail:string=``) {
        this.errorLogId = 0;
        this.errorMessage = errMsg;
        this.errorDetail = errDetail;
        this.errorDate = new Date();
    }

    public static createWithError(err: Error, errDetail:string=``) {
        const errLog = new ErrorLogModel(err.message, errDetail);
        if (err.stack) {
            errLog.errorStack = JSON.stringify(err.stack);
        }
        return errLog;
    }

}
