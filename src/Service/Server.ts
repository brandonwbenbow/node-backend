import { readFile, readdir } from "fs/promises";
import { join } from "path";

import express from "express";

import { DatabaseManager } from "./Database";
import { SessionManager } from "./Session";

export interface ServerConfig {

}

// Imports Database/Session for Self Management, Should try to isolate it from models
export class Server {
    static async Start() {
        let s = new Server(); await s.Start();
        return s;
    }

    private Config: ServerConfig;
    private App = express();

    private Session = new SessionManager();
    private DB = new DatabaseManager();

    constructor(config?: ServerConfig) {
        this.Config = config ?? {} as ServerConfig;
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
        await this.Configure(this.Config);
        this.App.listen(process.env.PORT ?? 8000);
    }

    HandleRequest = async (req: express.Request) => {
        let path = req.url.split('/').filter((val) => !!val);
        let file = await import(`../Route/${path.join('/')}`);
        // console.log("Dynamic Import Result:", file);
        const callback = file[req.method] ?? (() => { console.log("Method not found..."); });
        callback();
    }
}