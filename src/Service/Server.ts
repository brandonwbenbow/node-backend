import express from "express";
import { DatabaseManager } from "./Database";
import { SessionManager } from "./Session";

export interface ServerConfig {

}

// Imports Database/Session for Self Management, Should try to isolate it from models
export class Server {
    static Start() {
        let s = new Server(); s.Start();
        return s;
    }

    private Config: ServerConfig;
    private App = express();

    private Session = new SessionManager();
    private DB = new DatabaseManager();

    constructor(config?: ServerConfig) {
        this.Config = config ?? {} as ServerConfig;
        this.Configure();
    }

    async Configure(config?: ServerConfig) {
        
        // Session
        this.App.use(this.Session.HandleRequest);
    }

    async Start() {

    }
}