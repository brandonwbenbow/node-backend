import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

import { UTCDateTime } from "../Utility";

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
        return writeFile(Logger.LogPath + 'Log.txt', `\n${str}`, { flag: 'a+' });
    }
}