import { Test, TestingModule } from '@nestjs/testing';
import { LibraryEntryController } from './library-entry.controller';

describe('LibraryEntryController', () => {
  let controller: LibraryEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryEntryController],
    }).compile();

    controller = module.get<LibraryEntryController>(LibraryEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
