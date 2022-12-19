import IndexRepository from "../repositories/indexRepository";
import {ErrorLevel, ErrorLogModel} from "../models/ErrorLogModel";


export default class IndexService {
    private readonly indexRepo: IndexRepository;

    constructor() {
        this.indexRepo = new IndexRepository();
    }

    /**
     * Log Error
     */
    async logError(err:Error, details:string=``,level:ErrorLevel=ErrorLevel.Error) {
        const errorLog = ErrorLogModel.createWithError(err, details, level);
        return this.indexRepo.logError(errorLog);
    }
}
