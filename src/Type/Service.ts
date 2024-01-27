// DB and Session (and any future "plugin") will run as a "service"
    // might make chat similar, and use config for passing server with default

import { Server } from "../Service/Server";

export interface ServiceConfig {
    server: Server | undefined
}

export abstract class Service {
    protected config: ServiceConfig;

    constructor(config?: ServiceConfig) {
        this.config = {
            server: config?.server ?? undefined,
            ...config
        }
    }

    abstract Start(): Promise<void>
}