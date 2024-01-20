
import { RedisClientOptions, RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from "redis";
import RedisStore from "connect-redis";

import session, { SessionOptions, Session } from 'express-session';
import { RequestHandler } from "express";

export class RedisClient {
    private client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
    constructor(options?: RedisClientOptions<RedisModules, RedisFunctions, RedisScripts>) {
        this.client = createClient(options);
    }

    // Extend with Helpers
}

export interface SessionManagerConfig extends SessionOptions {
    // non SessionOptions stuff here
}

export class SessionManager {
    private config: SessionManagerConfig;
    private sessionParser: RequestHandler | undefined;
    private redisStore: RedisStore | undefined; // can handle other express-compatible stores

    constructor(config: SessionManagerConfig) {
        this.config = config;
    }

    ConfigureRedisStore(prefix: string, client: RedisClientType) {
        this.redisStore = new RedisStore({ client: client, prefix: prefix });
        return this.redisStore;
    }

    ConfigureSessinParser(store?: RedisStore, options?: SessionOptions) {
        this.sessionParser = session({ store: store ?? this.redisStore, ...(options ? options : this.config) });
        return this.sessionParser;
    }
}