import { Test, TestingModule } from '@nestjs/testing';
import { LibraryEntryService } from './library-entry.service';

describe('LibraryEntryService', () => {
  let service: LibraryEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibraryEntryService],
    }).compile();

    service = module.get<LibraryEntryService>(LibraryEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
