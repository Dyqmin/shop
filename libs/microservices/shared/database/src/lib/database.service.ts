import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB_CONFIG, DrizzleDatabaseConfig } from './database.config';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private _pool?: Pool;
  private readonly _drizzleDbConfig: DrizzleDatabaseConfig;

  constructor(@Inject(DRIZZLE_DB_CONFIG) drizzleConfig: DrizzleDatabaseConfig) {
    this._drizzleDbConfig = drizzleConfig;
  }

  onModuleInit(): void {
    const { port, user, password, host } = this._drizzleDbConfig;

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
    return drizzle(this._pool);
  }
}
