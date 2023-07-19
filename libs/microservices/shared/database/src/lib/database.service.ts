import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

interface DrizzleConfig {
  user: string;
  password: string;
  host: string;
  port: string;
}

// export const DRIZZLE_CONFIG_TOKEN = 'DRIZZLE_CONFIG_TOKEN';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private _pool?: Pool;

  // constructor(@Inject(DRIZZLE_CONFIG_TOKEN) drizzleConfig: DrizzleConfig) {
  //   console.log(drizzleConfig);
  // }

  onModuleInit(): void {
    const user = 'postgres';
    const password = 'postgres';
    const host = 'localhost';
    const port = '5432';

    console.log('connecting')
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
