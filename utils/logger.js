const winston = require("winston");
const colorizer = winston.format.colorize();

const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
        custom: 7,
    },
    colors: {
        error: "red",
        debug: "blue",
        warn: "yellow",
        data: "grey",
        info: "green",
        verbose: "cyan",
        silly: "magenta",
        custom: "yellow",
    },
};

const logger = winston.createLogger({
    levels: config.levels,
    format: winston.format.combine(
        winston.format.timestamp({ format: "DD/MM/YY HH:mm:ss" }),
        winston.format.printf(
            (info) =>
                colorizer.colorize(
                    info.level,
                    `[${info.timestamp}] ${info.level.replace(/\b\w/g, (l) => {
                        return l.toUpperCase();
                    })}`
                ) + `: ${info.message}`
        )
    ),
    transports: [
        new winston.transports.Console({ timestamp: true }),
    ],
    level: "custom",
});

module.exports = {logger};