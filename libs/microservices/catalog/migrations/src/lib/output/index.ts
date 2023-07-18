import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// for migrations
const migrationClient = postgres("postgres://postgres:postgres@localhost:5432/postgres", { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: './output' });
