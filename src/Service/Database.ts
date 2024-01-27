import { Dialect, Sequelize } from "sequelize";

import { Logger } from "./Logger";
import { Event, EventType } from "./Event";

import { Model } from "../Type/Model";
import { Service, ServiceConfig } from "../Type/Service";

export interface DatabaseServiceConfig extends ServiceConfig {

}

export class DatabaseService extends Service {
    private Models = new Set<Model>();

    private handler: Sequelize | undefined;

    constructor(config?: DatabaseServiceConfig) {
        super(config);

        this.handler = new Sequelize(
            process.env?.DATABASE_NAME ?? 'database', 
            process.env?.DATABASE_USER ?? 'postgres', 
            process.env?.DATABASE_PASSWORD ?? 'postgres', 
            { 
                host: process.env?.DATABASE_HOST ?? 'localhost',
                port: Number(process.env?.DATABASE_PORT ?? 5432),
                dialect: (process.env?.DATABASE_TYPE ?? 'postgres') as Dialect
            }
        );
    }

    async Start() {
        await this.Configure();
    }

    async Configure() {
        let promise = await new Promise((res, rej) => {
            this.handler?.authenticate().then(() => { res(true); }).catch(() => { res(false); });
        });

        if(!promise) { Logger.Write(`Failure Connecting to Database.`); return false; }

        // Configure, Connection was Authenticated
            // Event.Emit(EventType.Database_Ready, true); -> for cross service event
    }
}