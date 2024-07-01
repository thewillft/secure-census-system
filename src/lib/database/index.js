import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import tables from './tables';

sqlite3.verbose();

class Database {
    constructor() {
        this.db = null;
    }

    async getDb() {
        if (!this.db) {
            this.db = await open({
                filename: 'database.db',
                driver: sqlite3.Database
            });
            await this.setup()
        }
        return this.db;
    }

    async setup() {
        console.log(`[DATABASE] Setting up database`)
        for (const entry of Object.entries(tables)) {
            const tableName = entry[0];
            const sql = entry[1];
            await this.db.exec(sql);
            console.log('[DATABASE] Created table: ' + tableName)
        }
        this.isSetup = true;
    }

    async query(sql, ...params) {
        sql = sql.trim()
        console.log(`[DATABASE] Querying "${sql}" with ${params}`)
        const db = await this.getDb()
        return db.all(sql, ...params);
    }

    async execute(sql, ...params) {
        sql = sql.trim()
        console.log(`[DATABASE] Executing "${sql}" with ${params}`)
        const db = await this.getDb()
        db.run(sql, ...params);
    }
}

export default new Database();