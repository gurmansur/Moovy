import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { LibraryEntry } from './typeorm/entities/LibraryEntry';
import { LibraryEntryModule } from './library-entry/library-entry.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
require('dotenv').config();

@Module({
  imports: [UsersModule, LibraryEntryModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, LibraryEntry],
    synchronize: true
  }), AuthModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
