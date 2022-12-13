import {GetGroupsQuery, IGroup} from "../models/Group.model";
import IndexRepository from "../repositories/indexRepository";
import {ErrorLogModel} from "../models/ErrorLogModel";
import GroupRepository from "../repositories/groupRepository";


export default class IndexService {
    private readonly indexRepo: IndexRepository;

    constructor() {
        this.indexRepo = new IndexRepository();
    }

    /**
     * Log Error
     */
    async logError(err:Error, details:string=``) {
        const errorLog = ErrorLogModel.createWithError(err, details);
        return this.indexRepo.logError(errorLog);
    }
}
