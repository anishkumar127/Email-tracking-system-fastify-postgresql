const env = process.env.NODE_ENV || 'development';

// Common logging options
const logOptions = {
    level: env === 'production' ? 'info' : 'debug',
    formatters: {
        level: (label) => ({ level: label }),
    },
};

// Development-specific options
const devLogOptions = {
    ...logOptions,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true, // Colorize logs
            translateTime: 'yyyy-mm-dd HH:MM:ss', // Format timestamps
            // ignore: 'pid,hostname', // Ignore certain fields
        },
    },
};

// Production-specific options
const prodLogOptions = {
    ...logOptions,
};

export const loggerOptions = env === 'production' ? prodLogOptions : devLogOptions;
