import * as util from 'util';
import { createLogger, format, transports } from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
import config from '../config.ts/config';
import { EApplicationEnvironment } from '../constants/application';
import path from 'path';

// Define log format
const logFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    const customLevel = level.toUpperCase();
    const customTimestamp = timestamp || new Date().toISOString();
    const customMessage = message;
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null
    });

    return `[${customTimestamp}] [${customLevel}] ${customMessage} META ${customMeta}`;
});

// Console transport for development
const consoleTransport = (): ConsoleTransportInstance[] => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: "info",
                format: format.combine(format.timestamp(), logFormat),
            }),
        ];
    }
    return [];
};

// File transport for logging
const fileTransport = new transports.File({
    filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
    level: 'info',
    format: format.combine(format.timestamp(), format.json()), // JSON format for structured logs
});

// Create logger safely
const logger = createLogger({
    level: "info",
    defaultMeta: { meta: {} },
    transports: [...consoleTransport(), fileTransport],
    silent: config.ENV === EApplicationEnvironment.PRODUCTION, // Fully disable logging in production
});

export default logger;
