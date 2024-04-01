import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { HttpModule } from '@nestjs/axios';
import { MoviesService } from './services/movies.service';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
