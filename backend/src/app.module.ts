import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { LibraryEntry } from './typeorm/entities/LibraryEntry';
import { LibraryEntryModule } from './library-entry/library-entry.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, LibraryEntryModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'moovy',
    entities: [User, LibraryEntry],
    synchronize: true
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
