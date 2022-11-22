import {Err, IErr} from "./Err";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

export interface IResult<T> {
    success: boolean;
    data?: T;
    err?: IErr;
    [key: string]: any;
    getErrorCode():string;
}

export class Result<T> implements IResult<T> {
    [key: string]: any;
    success: boolean;
    data?: T;
    err?: IErr;

    constructor(success?: boolean, data?: T, err?: IErr) {
        this.success = success === undefined ? true : success;
        this.data = data;
        this.err = err;
    }

    getErrorCode() {
        let code = `500`;
        const msgArr = this.err?.msg?.split(`|`);
        if (Array.isArray(msgArr) && msgArr.length > 1) {
            code = msgArr[0];
            // console.log(code);
        }

        if (!code) return `500`;
        return code;
    }
}


export class ResultOk<T> extends Result<T> {
    constructor(data: T) {
        super(true, data, undefined);
    }
}

export class ResultError<T> extends Result<T> {
    constructor(err: IErr) {
        super(false, undefined, err);
    }

    static getDefaultError<T>(errMsg:string, location:string) {
        const space = errMsg.length > 0 ? ` ` : ``;
        return new ResultError<T>(
            new Err(
                `500|Something bad happen.${space}${errMsg}`,
                location
            )
        );
    }
}

export class ResultErrorBadRequest<T> extends Result<T> {
    constructor(msg: string, location:string, errorLogId: string) {
        if(msg.length === 0) msg = ReasonPhrases.BAD_REQUEST;
        msg = "".concat(StatusCodes.BAD_REQUEST.toString(), "|", msg);
        const err = new Err(msg, location, errorLogId);
        super(false, undefined, err);
    }
}

export class ResultErrorNotFound<T> extends Result<T> {
    constructor(msg: string, location:string, errorLogId: string) {
        if(msg.length === 0) msg = ReasonPhrases.NOT_FOUND;
        msg = "".concat(StatusCodes.NOT_FOUND.toString(), "|", msg);
        const err = new Err(msg, location, errorLogId);
        super(false, undefined, err);
    }
}

export class ResultErrorInternalServer<T> extends Result<T> {
    constructor(msg: string, location:string, errorLogId: string) {
        if(msg.length === 0) msg = ReasonPhrases.INTERNAL_SERVER_ERROR;
        msg = "".concat(StatusCodes.INTERNAL_SERVER_ERROR.toString(), "|", msg);
        const err = new Err(msg, location, errorLogId);
        super(false, undefined, err);
    }
}
