import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import tables from './tables';

sqlite3.verbose();

class Database {
    constructor() {
        this.isSetup = false;
    }

    async getDb() {
        const db = await open({
            filename: 'database.db',
            driver: sqlite3.Database
        });
        if (!this.isSetup) await this.setup(db)
        return db;
    }

    async setup(db) {
        console.log(`[DATABASE] Setting up database`)
        for (const entry of Object.entries(tables)) {
            const tableName = entry[0];
            const sql = entry[1];
            await db.exec(sql);
            console.log('[DATABASE] Created table: ' + tableName)
        }
        this.isSetup = true;
    }

    async query(sql, ...params) {
        console.log(`[DATABASE] Querying "${sql}" with ${params}`)
        const db = await this.getDb()
        return db.all(sql, ...params);
    }

    async execute(sql, ...params) {
        console.log(`[DATABASE] Executing "${sql}" with ${params}`)
        const db = await this.getDb()
        db.run(sql, ...params);
    }
}

export default new Database();