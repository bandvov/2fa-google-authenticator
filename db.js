import { JsonDB, Config } from 'node-json-db'

const db = new JsonDB(new Config("2fa", true, false, '/'));
export { db }