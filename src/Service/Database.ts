import { Client } from 'pg';

import { Logger } from "./Logger";
import { Event, EventType } from "./Event";

import { Model } from "../Type/Model";
import { Service, ServiceConfig } from "../Type/Service";

export interface DatabaseServiceConfig extends ServiceConfig {

}

export class DatabaseService extends Service {
    private Models = new Set<Model>();

    private handler: Client;

    constructor(config?: DatabaseServiceConfig) {
        super(config);

        this.handler = new Client({
            host: process.env?.DATABASE_HOST ?? 'localhost',
            port: Number(process.env?.DATABASE_PORT ?? 5432),
            database: process.env?.DATABASE_NAME ?? 'database',
            user: process.env?.DATABASE_USER ?? 'postgres', 
            password: process.env?.DATABASE_PASSWORD ?? 'postgres', 
        });
    }

    async Start() {
        await this.Configure();
    }

    async Configure() {
        try {
            await this.handler.connect();
        } catch(err) {
            Logger.Write(`Failure Connecting to Database.`); 
            return false;
        }

        // Configure, Connection was Authenticated
            // Event.Emit(EventType.Database_Ready, true); -> for cross service event
    }
}