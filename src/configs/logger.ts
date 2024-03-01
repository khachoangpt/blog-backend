import winston from 'winston'
import 'winston-daily-rotate-file'

export const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.prettyPrint(),
				winston.format.colorize(),
				winston.format.printf((info) => {
					return `[${info.level}] ${info.timestamp} :: ${info.message}`
				}),
			),
		}),
		new winston.transports.DailyRotateFile({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.prettyPrint(),
				winston.format.printf((info) => {
					return `[${info.level}] ${info.timestamp} :: ${info.message}`
				}),
			),
			filename: 'logs/logger-%DATE%.log',
			datePattern: 'YYYY-MM-DD-HH',
			zippedArchive: true,
			maxSize: '5m',
		}),
	],
})
