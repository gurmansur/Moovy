import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryEntry } from 'src/typeorm/entities/LibraryEntry';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from 'src/users/controllers/users/users.controller';
import { CreateLibraryEntryType } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class LibraryEntryService {

    constructor(
        @InjectRepository(LibraryEntry) private libraryEntryRepository: Repository<LibraryEntry>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {
        
    }

    async createEntry(id: number, createLibraryEntryInfo: CreateLibraryEntryType) {
        const user = await this.userRepository.findOneBy({id});
        if (!user) throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);

        const newEntry = this.libraryEntryRepository.create({
            ...createLibraryEntryInfo,
            user
        })

        return this.libraryEntryRepository.save(newEntry);
    }

    async fetchEntriesByUserId(id: number) {
        const userEntries = this.libraryEntryRepository.findBy({user: {id: id}})
        return userEntries;
    }

    async fetchEntries(){
        return this.libraryEntryRepository.find();
    }

}
