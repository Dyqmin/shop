import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DRIZZLE_DB_CONFIG, DrizzleDatabaseConfig } from "./database.config";

@Module({})
export class MicroservicesSharedDatabaseModule {
  static forRoot(config: DrizzleDatabaseConfig): DynamicModule {
    return {
      module: MicroservicesSharedDatabaseModule,
      providers: [
        {
          provide: DRIZZLE_DB_CONFIG,
          useValue: config,
        },
        DatabaseService,
      ],
      exports: [DatabaseService],
    };
  }
}
