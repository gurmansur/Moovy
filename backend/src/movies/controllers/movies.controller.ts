import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private moviesService: MoviesService){}

    @Get(':search')
    getMovies(@Param('search') search: string){
        return this.moviesService.searchMovies(search);
    }

    @Get('info/:imdbId')
    getMovieInfo(@Param('imdbId') search: string){
        return this.moviesService.getMovieInfo(search);
    }

}
