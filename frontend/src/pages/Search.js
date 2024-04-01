import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [invalidSearch, setInvalidSearch] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=a58446f4&s=${searchTerm.toLowerCase()}&type=movie`);
            setInvalidSearch(response.data.Response !== "True");
            setMovies(response.data.Search);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Typography variant="h5" color="initial">Search</Typography>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>

            {invalidSearch && <p>Invalido</p>}
            {!invalidSearch && 
                <Grid container spacing={2} justifyContent="center" direction="row" sx={{pl: "25vw", pr: "25vw"}}>
                    {movies.map(movie => (
                        <Grid item xs={4} key={movie.imdbID}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            }
        </div>
    );
};

export default Search;