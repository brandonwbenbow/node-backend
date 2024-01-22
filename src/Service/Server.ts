import { DatabaseManager } from "./Database";
import { SessionManager } from "./Session";

// Imports Database/Session for Self Management, Should try to isolate it from models
export class Server {
    static Start() {
        let s = new Server(); s.Start();
        return s;
    }

    private Session = new SessionManager();
    private DB = new DatabaseManager();

    constructor() {}

    async Start() {

    }
}