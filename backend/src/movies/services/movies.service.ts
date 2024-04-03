import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
require('dotenv').config();

@Injectable()
export class MoviesService {
    constructor(private readonly httpService: HttpService){}

    searchMovies(searchTerm: string) {
        return this.httpService.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_APIKEY}&s=${searchTerm.toLowerCase()}&type=movie`, {
            headers: {
                'Accept': 'application/json'
            }
          }).pipe(
              map(response => response.data),
        );
    }

    getMovieInfo(imdbId: string) {
        return this.httpService.get(`http://www.omdbapi.com/?apikey=a58446f4&i=${imdbId}`, {
            headers: {
                'Accept': 'application/json'
            }
        }).pipe(
            map(response => response.data),
        );
    }

}
