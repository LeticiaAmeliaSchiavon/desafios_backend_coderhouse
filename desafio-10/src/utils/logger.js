const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Definindo níveis de log personalizados
const levels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
};

// Formato do log
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Logger para desenvolvimento
const devLogger = createLogger({
    levels, // Usando os níveis personalizados
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
    levels, // Usando os níveis personalizados
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