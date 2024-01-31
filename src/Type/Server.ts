import { readFile, readdir } from "fs/promises";
import { Server as HTTPServer } from "http";
import { join } from "path";

import express, { Request, Response, NextFunction } from "express";

import { Service } from "./Service";
import {
    ChatService,
    DatabaseService,
    EventService,
    SessionService
} from "../Service";

export interface ServerConfig {

}

// Imports Database/Session for Self Management, Should try to isolate it from models
export class Server {
    static async Start(config?: ServerConfig, ...services: Service[]) {
        return await (new Server(config, ...services)).Start();
    }

    private App = express();
    private Service: { [key: string]: Service | undefined } = {}

    private config: ServerConfig;
    private listener: HTTPServer | undefined;

    constructor(config?: ServerConfig, ...services: Service[]) {
        this.config = config ?? {} as ServerConfig;
        services.forEach(service => { this.AddService(service); });
        console.log("Server Constuctor Finished...");
    }

    async Configure(config?: ServerConfig) {
        //// Service Routes
        // Session
        if(this.Service?.Session) {
            this.App.use((this.Service.Session as SessionService).HandleRequest);
        }

        // Auto-Route and Catch All
        this.App.all('*', async (req, res, next) => {
            let result = await this.HandleRequest(req, res, next);
        });
    }

    async Start() {
        await this.Configure(this.config);
        this.listener = this.App.listen(process.env.PORT ?? 8000, () => { console.log("Listening..."); });
        console.log("Starting Server...");
        return this;
    }

    async AddService(service: Service) { this.Service[service.GetName()] = service; }

    HandleRequest = async (req: Request, res: Response, next: NextFunction) => {
        let path = req.url.split('/').filter((val) => !!val);
        let file = await import(`../Route/${path.join('/')}`); // dynamic base directory needed -- todo

        // Run Function
        (file[req.method] ?? this.RequestFallback)(req, res, next);
    }

    RequestFallback = async (req: Request, res: Response, next: NextFunction) => {
        // check if 404 route exists, default to that
        return (() => { console.log("Method not found..."); })
    }

    // Chat Server Handles Upgrade for Itself, Given acces to Server Class Instance for noServer Config
    GetListener() { return this.listener; }
}