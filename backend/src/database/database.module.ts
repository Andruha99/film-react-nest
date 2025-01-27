import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configProvider } from '../app.config.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'prac',
        password: 'prac',
        database: 'prac_project',
        entities: [__dirname + '/../*/**/*.entity{.js, .ts}'],
        synchronize: false,
      }),
      //   useFactory: (configService: ConfigService) => ({
      //     type: 'postgres',
      //     host: configService.get('DATABASE_HOST'),
      //     port: configService.get('DATABASE_PORT'),
      //     username: configService.get('DATABASE_USERNAME'),
      //     password: configService.get('DATABASE_PASSWORD'),
      //     database: configService.get('DATABASE_DB'),
      //     entities: [],
      //     synchronize: false,
      //   }),
      inject: [ConfigService],
    }),
  ],
  providers: [configProvider],
})
export class DatabaseModule {}
