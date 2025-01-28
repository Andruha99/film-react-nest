import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configProvider } from '../app.config.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // type: 'postgres',
        type: configService.get(
          'DATABASE_DRIVER',
        ) as TypeOrmModuleOptions['type'],
        host: configService.get('DATABASE_URL'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DB'),
        entities: [__dirname + '/../*/**/*.entity{.js, .ts}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [configProvider],
})
export class DatabaseModule {}
