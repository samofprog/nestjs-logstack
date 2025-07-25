import * as winston from "winston";
import "winston-daily-rotate-file";
import { WinstonModule } from "nest-winston";
import * as path from "path";

const logDir = path.join(process.cwd(), "logs");

export class LoggerUtils {
    buildLogger(maxSize: string = "20m", maxFiles: string = "14d") {
        return WinstonModule.createLogger(
            this.createDefaultWinstonConfig(maxSize, maxFiles)
        );
    }

    private createDefaultWinstonConfig(
        maxSize: string = "20m",
        maxFiles: string = "14d"
    ) {
        return {
            transports: [
                this.createDailyRotateTransport("info", maxSize, maxFiles),
                this.createDailyRotateTransport("warn", maxSize, maxFiles),
                this.createDailyRotateTransport("error", maxSize, maxFiles),
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
        };
    }

    private createDailyRotateTransport(
        level: string,
        maxSize: string,
        maxFiles: string
    ) {
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
    }
}
