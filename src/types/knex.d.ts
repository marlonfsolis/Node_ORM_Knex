import { Knex as KnexOriginal } from 'knex';

declare module 'knex' {
    namespace Knex {
        interface QueryBuilder {
            exists<TRecord, TResult>(exp: any): KnexOriginal.QueryBuilder<TRecord, TResult>;
        }
    }
}
