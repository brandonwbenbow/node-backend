import RedisStore from "connect-redis";
import { RedisClientOptions, RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from "redis";

export class RedisClient {
    private client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
    constructor(options?: RedisClientOptions<RedisModules, RedisFunctions, RedisScripts>) {
        this.client = createClient(options);
    }

    // Extend with Helpers
}

export class SessionManager {
    private redisStore: RedisStore | undefined;

    constructor() {}

    ConfigureRedisStore(prefix: string, client: RedisClientType) {
        this.redisStore = new RedisStore({
            client: client,
            prefix: prefix
        });

        return this.redisStore;
    }
}