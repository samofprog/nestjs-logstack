import * as winston from "winston";
import "winston-daily-rotate-file";
import { WinstonModule } from "nest-winston";
import { LoggerService } from "@nestjs/common";
import * as process from "node:process";

export { LoggerService } from "@nestjs/common";

const logDir = "logs";

const createDailyRotateTransport = (
    level: string,
    maxSize: string,
    maxFiles: string
) => {
    return new winston.transports.DailyRotateFile({
        level,
        filename: `${logDir}/${level}-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize,
        maxFiles,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
    });
};

const createDefaultWinstonConfig = (
    maxSize: string = "20m",
    maxFiles: string = "14d"
) => ({
    transports: [
        createDailyRotateTransport("info", maxSize, maxFiles),
        createDailyRotateTransport("warn", maxSize, maxFiles),
        createDailyRotateTransport("error", maxSize, maxFiles),
        new winston.transports.Console({
            stderrLevels: ["error"],
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp(),
                winston.format.colorize({ all: true }),
                winston.format.printf(
                    ({ timestamp, level, message, stack, context }) => {
                        const stackTrace = stack ? `\n${stack}` : "";
                        const ctx = context ? `[${context}] ` : "";
                        return `${timestamp} ${level}: ${ctx}${message} ${!process.env.NODE_ENV?.includes("prod") ? stackTrace : ""}`;
                    }
                )
            ),
        }),
    ],
});

export function createNestLoggerService(
    maxSize: string = "20m",
    maxFiles: string = "14d"
): LoggerService {
    return WinstonModule.createLogger(
        createDefaultWinstonConfig(maxSize, maxFiles)
    );
}
