import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Typography, TextField, InputAdornment, Button, IconButton } from '@mui/material';
import MovieCard from '../components/MovieCard';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [invalidSearch, setInvalidSearch] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3001/movies/${searchTerm.toLowerCase()}`);
            console.log(response);
            setInvalidSearch(response.data.Response !== "True");
            setMovies(response.data.Search);
        } catch (error) {
            console.error(error);
        }
    };

    const pressEnter = (e) => {
        if (e.keyCode === 13) {
          handleSearch();
        }
    };

    return (
        <div>
            <Typography variant="h5" color="initial" transformOrigin={{ vertical: 'top', horizontal: 'left' }}>Search</Typography>

            <TextField
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => pressEnter(e)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="search" onClick={handleSearch}  >
                                <SearchIcon sx={{color: 'black'}}></SearchIcon>
                            </IconButton>
                        </InputAdornment>
                    ),
                    sx: {borderRadius: '50px', bgcolor: 'white', height: '8vh', width: '30vw'}
                }}
            > 
            </TextField>
            

            {invalidSearch && <Typography>Invalido</Typography>}
            {!invalidSearch &&
                <Grid container spacing={2} justifyContent="center" direction="row" sx={{ pl: "15vw", pr: "15vw", pt: "5vh" }}>
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