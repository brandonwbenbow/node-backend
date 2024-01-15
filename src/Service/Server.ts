import { DatabaseManager } from "./Database";

// Imports Database/Session for Self Management, Should try to isolate it from models
export class Server {
    static Start() {
        let s = new Server(); s.Start();
        return s;
    }

    private DBManager = new DatabaseManager();

    constructor() {}

    async Start() {

    }
}