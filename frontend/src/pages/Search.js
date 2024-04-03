import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import MovieCard from '../components/MovieCard';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Search = ({setSelectedTab}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [invalidSearch, setInvalidSearch] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3001/movies/${searchTerm.toLowerCase()}`);
            setInvalidSearch(response.data.Response !== "True");
            setMovies(response.data.Search);
        } catch (error) {
            console.error(error);
        }
    };

    const checkAuthorized = async () => {
        try {
            setUser((await axios.get('http://127.0.0.1:3001/auth/status')).data);
        } catch (e) {
            if (e.response.status === 401) {
                setSelectedTab('Login');
                return navigate('/login')
            }
        }
    }

    const pressEnter = (e) => {
        if (e.keyCode === 13) {
          handleSearch();
        }
    };

    useEffect(() => {
        checkAuthorized();
    })

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
                    sx: {borderRadius: '50px', bgcolor: 'white', height: 40, width: '30vw'}
                }}
            > 
            </TextField>
            

            {invalidSearch && <Typography>Invalid Search</Typography>}
            {!invalidSearch &&
                <Grid container spacing={2} justifyContent="center" direction="row" sx={{ pl: 15, pr: 15, pt: 5 }}>
                    {movies.map(movie => (
                        <Grid item key={movie.imdbID}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            }
        </div>
    );
};

export default Search;