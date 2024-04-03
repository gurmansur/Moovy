import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, TextField, InputAdornment, IconButton, Box, Collapse, Alert } from '@mui/material';
import MovieCard from '../components/MovieCard';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Search = ({setSelectedTab}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [invalidSearch, setInvalidSearch] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [alert, setAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const handleAlert = (name, operation) => {
        setAlertInfo({name: name, operation: operation});
        setAlert(true);
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}movies/${searchTerm.toLowerCase()}`);
            setInvalidSearch(response.data.Response !== "True");
            setMovies(response.data.Search);
        } catch (error) {
            console.error(error);
        }
    };

    const checkAuthorized = async () => {
        try {
            setUser((await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}auth/status`)).data);
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
    }, [])

    return (
        <Box>
            <Collapse in={alert}>
                <Alert severity={alertInfo.operation === 'added' ? "success" : "error"} sx={{ mb: 2 }} onClose={() => setAlert(false)}>
                    {alertInfo.name} {alertInfo.operation} {alertInfo.operation === 'added' ? "to" : "from"} your library
                </Alert>
            </Collapse>
            <Typography variant="h5" color="initial">Search</Typography>

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
                            <MovieCard movie={movie} handleAlert={handleAlert} loading={loading} setLoading={setLoading}/>
                        </Grid>
                    ))}
                </Grid>
            }
        </Box>
    );
};

export default Search;