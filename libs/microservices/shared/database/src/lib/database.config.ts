export interface DrizzleDatabaseConfig {
    user: string;
    password: string;
    host: string;
    port: string;
}

export const DRIZZLE_DB_CONFIG = 'DRIZZLE_CONFIG_TOKEN';
