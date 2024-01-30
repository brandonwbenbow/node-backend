import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

import { UTCDate, UTCDateTime } from "../Utility";
import { Service, ServiceConfig } from "../Type/Service";

export interface LogOptions {
    time?: boolean,
    console?: boolean
}

export class Logger {
    static LogPath = join(process.cwd(), '/log/');

    static async Write(message: string, options?: LogOptions) {
        let str = `${options?.time === false ? '' : `${UTCDateTime()} -> `}${message}`;
        if(options?.console === true) { console.log(str); }

        await mkdir(Logger.LogPath, { recursive: true });
        return writeFile(Logger.LogPath + `log_${UTCDate()}.txt`, `\n${str}`, { flag: 'a+' });
    }

    static async Post() {
        // sends log text to remote server, same formatting
    }
}

export interface LogServiceConfig extends ServiceConfig {

}

export class LogService extends Service {
    constructor(config?: LogServiceConfig) {
        super(config);
    }

    async Start() {

    }
}