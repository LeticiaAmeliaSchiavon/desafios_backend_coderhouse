const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Formato do log
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Logger para desenvolvimento
const devLogger = createLogger({
    level: 'debug', // Log a partir do nível "debug"
    format: combine(
        colorize(), // Adiciona cores ao log no console
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(), // Log apenas no console
    ],
});

// Logger para produção
const prodLogger = createLogger({
    level: 'info', // Log a partir do nível "info"
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(), // Log no console
        new transports.File({ filename: 'errors.log', level: 'error' }), // Log de erros em arquivo
    ],
});

// Escolhe o logger com base no ambiente
const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

module.exports = logger;