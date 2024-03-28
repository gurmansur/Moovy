import { Module } from '@nestjs/common';
import { LibraryEntryService } from './services/library-entry/library-entry.service';
import { LibraryEntryController } from './controllers/library-entry/library-entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryEntry } from 'src/typeorm/entities/LibraryEntry';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryEntry]), TypeOrmModule.forFeature([User])],
  providers: [LibraryEntryService, UsersService],
  controllers: [LibraryEntryController]
})
export class LibraryEntryModule {}
