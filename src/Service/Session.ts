
import { RedisClientOptions, RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from "redis";
import RedisStore from "connect-redis";

import session, { SessionOptions, Session } from 'express-session';
import { RequestHandler, Request, Response } from "express";

import { Logger } from "./Logger";
import { User } from "../Model/User";

export class RedisClient {
    private handler: RedisClientType<RedisModules, RedisFunctions, RedisScripts> | undefined;

    constructor(options?: RedisClientOptions<RedisModules, RedisFunctions, RedisScripts>) {
        this.handler = createClient(options);
    }

    // Extend with Helpers
}

export interface SessionManagerConfig extends SessionOptions {
    // non SessionOptions stuff here
}

export class SessionManager {
    private config: SessionManagerConfig | undefined;
    private handler: RequestHandler | undefined;
    private store: RedisStore | undefined; // can handle other express-compatible stores

    constructor(config?: SessionManagerConfig) {
        this.config = config;;
    }

    ConfigureRedisStore(prefix: string, client: RedisClientType) {
        this.store = new RedisStore({ client: client, prefix: prefix });
        return this.store;
    }

    ConfigureSessinParser(store?: RedisStore, options?: SessionOptions) {
        if(!(options || this.config)) { Logger.Write("Invalid Session Config."); return; }

        this.handler = session({ store: store ?? this.store, ...((options ? options : this.config) as SessionOptions) });
        return this.handler;
    }

    HandleRequest(request: Request, response: Response, next: any) {
        if(!this.handler) { return next(); }

        // applies session to request
    }

    GetUser(request: Request) {
        return {} as User;
    }
}