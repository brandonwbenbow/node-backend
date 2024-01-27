import { readFile, readdir } from "fs/promises";
import { Server as HTTPServer } from "http";
import { join } from "path";

import express from "express";

import { DatabaseManager } from "./Database";
import { SessionManager } from "./Session";
import { ChatManager } from "./Chat";

export interface ServerConfig {

}

// Imports Database/Session for Self Management, Should try to isolate it from models
export class Server {
    static async Start() {
        let s = new Server(); await s.Start();
        return s;
    }

    private App = express();

    // Mandatory Services? - might make these optional as well
    private DB = new DatabaseManager();
    private Session = new SessionManager();

    // Optional Services?
    private Chat = new ChatManager({ server: this });

    private config: ServerConfig;
    private listener: HTTPServer | undefined;

    constructor(config?: ServerConfig) {
        this.config = config ?? {} as ServerConfig;
    }

    async Configure(config?: ServerConfig) {
        
        // Session
        this.App.use(this.Session.HandleRequest);

        // Custom Routes Here

        // Auto-Route and Catch All
        this.App.all('*', async (req, res, next) => {
            let result = await this.HandleRequest(req);
        });
    }

    async Start() {
        await this.Configure(this.config);
        this.listener = this.App.listen(process.env.PORT ?? 8000);
    }

    HandleRequest = async (req: express.Request) => {
        let path = req.url.split('/').filter((val) => !!val);
        let file = await import(`../Route/${path.join('/')}`);
        // console.log("Dynamic Import Result:", file);
        const callback = file[req.method] ?? (() => { console.log("Method not found..."); });
        callback();
    }

    // Chat Server Handles Upgrade for Itself, Given acces to Server Class Instance for noServer Config
    GetListener() { return this.listener; }
}