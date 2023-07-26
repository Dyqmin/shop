import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB_CONFIG, DrizzleDatabaseConfig } from './database.config';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private _pool?: Pool;

  constructor(@Inject(DRIZZLE_DB_CONFIG) private readonly _drizzleConfig: DrizzleDatabaseConfig) {}

  onModuleInit(): void {
    const { port, user, password, host } = this._drizzleConfig;

    try {
      this._pool = new Pool({
        connectionString: `postgres://${user}:${password}@${host}:${port}/postgres`,
      });
    } catch (e) {
      console.error('Failed to connect to database');
      console.error(e);
    }
  }

  get db(): NodePgDatabase {
    if (!this._pool) {
      throw 'No pool connection!'
    }
    return drizzle(this._pool);
  }

  getDb<TSchema extends Record<string, unknown> = Record<string, never>>(schema?: TSchema): NodePgDatabase<TSchema> {
    if (!this._pool) throw 'No pool connection!';
    return drizzle(this._pool, { schema });
  }
}
