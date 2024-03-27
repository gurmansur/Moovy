import React, { useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import MovieCard from '../components/MovieCard';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=a58446f4&s=${searchTerm.toLowerCase()}`);
            const filteredMovies = response.data.Search.filter(movie => movie.Type === 'movie');
            console.log(filteredMovies);
            setMovies(filteredMovies);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>

            <Grid container spacing={2} justifyContent="center" sx={{mt: '3vh'}}>
                {movies.map(movie => (
                    <Grid item xs={4} key={movie.imdbID}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Search;