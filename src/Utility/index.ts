
export const PadNumber: (num: number, padLength?: number) => string = (num: number, padLength = 2) => {
    return String(num).padStart(padLength, '0');
}

export const UTCDateTime: (date?: Date) => string = (date = new Date()) => {
    let t = date;
    let str = `[${t.getUTCFullYear()}-${PadNumber(t.getUTCMonth() + 1)}-${PadNumber(t.getUTCDate())}]`;
    str += ` ${PadNumber(t.getUTCHours())}:${PadNumber(t.getUTCMinutes())}:${PadNumber(t.getUTCSeconds())}`;
    str += `.${PadNumber(t.getUTCMilliseconds(), 3)}`;
    return str.trim();
}

export const UTCDate: (date?: Date) => string = (date = new Date()) => {
    let t = date;
    let str = `${t.getUTCFullYear}-${PadNumber(t.getUTCMonth() + 1)}-${PadNumber(t.getUTCDate())}`;
    return str.trim();
}

export const LoadDirectoryExports = (...path: string[]) => {
    var normalizedPath = require("path").join(...path);
    console.log("Loading Directory Exports from:", normalizedPath);

    let exports: any = {};
    require("fs").readdirSync(normalizedPath).forEach((file: any) => {
        exports[file] = require(normalizedPath + "/" + file);
    });

    return exports;
}


