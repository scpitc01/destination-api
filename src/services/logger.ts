import pino from 'pino';

// Create a Pino logger instance
const logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', // Adjust log level based on environment
});

export default logger