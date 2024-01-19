import { Dialect, Sequelize } from "sequelize";

import { Logger } from "./Logger";
import { Model } from "../Type/Model";

export class DatabaseManager {

    private Sequel;

    private Models = new Set<Model>();

    constructor() {
        this.Sequel = new Sequelize(
            process.env?.DATABASE_NAME ?? 'database', 
            process.env?.DATABASE_USER ?? 'postgres', 
            process.env?.DATABASE_PASSWORD ?? 'postgres', 
            { 
                host: process.env?.DATABASE_HOST ?? 'localhost',
                port: Number(process.env?.DATABASE_PORT ?? 5432),
                dialect: (process.env?.DATABASE_TYPE ?? 'postgres') as Dialect
            }
        );

        this.Configure();
    }

    async Configure() {
        let result = await this.Sequel.authenticate();
        Logger.Write(`Connection Result: ${result}`);
    }
}