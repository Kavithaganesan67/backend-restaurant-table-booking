import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

export const readOnlyDbProvider = {
  provide: 'readOnlyDb',
  useFactory: (sequelize: Sequelize) => sequelize,
  inject: [Sequelize],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 make env variables globally available
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('DB_HOST') ?? 'localhost',
        port: parseInt(config.get<string>('DB_PORT') ?? '5432', 10),
        username: config.get<string>('DB_USERNAME') ?? 'postgres',
        password: String(config.get<string>('DB_PASSWORD') ?? ''),
        database: config.get<string>('DB_NAME') ?? 'restaurant',
        autoLoadModels: true,
        synchronize: true,
        logging: console.log,
      }),
    }),
  ],
  providers: [readOnlyDbProvider],
  exports: [readOnlyDbProvider],
})
export class DatabaseModule {}
