import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LibraryEntryService } from 'src/library-entry/services/library-entry/library-entry.service';
import { CreateLibraryEntryType } from 'src/utils/types';

@Controller('library-entries')
export class LibraryEntryController {

    constructor(private libraryEntryService: LibraryEntryService){}

    @Get()
    async getEntries(){
        return this.libraryEntryService.fetchEntries();
    }

    @Post(':id')
    createEntry(
        @Param('id', ParseIntPipe) id: number, 
        @Body() createLibraryEntryInfo: CreateLibraryEntryType
    ){
        return this.libraryEntryService.createEntry(id, createLibraryEntryInfo);
    }

    @Get(':id')
    async getEntriesByUser(
        @Param('id', ParseIntPipe) id: number,
    ){
        return this.libraryEntryService.fetchEntriesByUserId(id);
    }
}
