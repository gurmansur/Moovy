import { Typography, Grid } from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const MyLibrary = () => {

    const [movies, setMovies] = useState([])

    const getLibrary = async() => {
        const user = (await axios.get('http://127.0.0.1:3001/auth/status')).data;
        const library = (await axios.get(`http://127.0.0.1:3001/library-entries/${user.id}`)).data;

        const libraryInfo = await Promise.all(library.map(async (entry) => {
            const movieData = (await axios.get(`http://127.0.0.1:3001/movies/info/${entry.imdbId}`)).data
            return movieData;
        }))

        setMovies(libraryInfo);
    }

    useEffect(() => {
        getLibrary();
    })

    return(
        <div>
            <Typography variant="h5" color="initial">My Library</Typography>
            <Grid container spacing={2} justifyContent="center" direction="row" sx={{ pl: "15vw", pr: "15vw", pt: "5vh" }}>
                    {movies.map(movie => (
                        <Grid item xs={4} key={movie.imdbId}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    )
}

export default MyLibrary;