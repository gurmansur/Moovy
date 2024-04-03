import { Typography, Grid } from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { useNavigate, useLocation } from 'react-router-dom';

const MyLibrary = ({setSelectedTab}) => {

    const [movies, setMovies] = useState([])
    const navigate = useNavigate();
    const location = useLocation();

    const getLibrary = async() => {
        try {
            const user = (await axios.get('http://127.0.0.1:3001/auth/status')).data;
            const library = (await axios.get(`http://127.0.0.1:3001/library-entries/${user.id}`)).data;

            const libraryInfo = await Promise.all(library.map(async (entry) => {
                const movieData = (await axios.get(`http://127.0.0.1:3001/movies/info/${entry.imdbId}`)).data
                return movieData;
            }))

            setMovies(libraryInfo);
        } catch (e) {
            if (e.response.status === 401) {
                setSelectedTab('Login');
                return navigate('/login', { state: { from: location}, replace: true});
            }
        }
    }

    useEffect(() => {
        getLibrary();
    })

    return(
        <div>
            <Typography variant="h5" color="initial">My Library</Typography>
            <Grid container spacing={2} justifyContent="center" direction="row" sx={{ pl: 15, pr: 15, pt: 5 }}>
                    {movies.map(movie => (
                        <Grid item key={movie.imdbId}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    )
}

export default MyLibrary;