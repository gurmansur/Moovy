import { Typography, Grid, Modal, Box, Button, Card, Alert, IconButton, Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';


const MyLibrary = ({setSelectedTab}) => {

    const [movies, setMovies] = useState([])
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const handleAlert = (name, operation) => {
        setAlertInfo({name: name, operation: operation});
        setAlert(true);
    }

    const getLibrary = async() => {
        try {
            const user = (await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}auth/status`)).data;
            const library = (await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}library-entries/${user.id}`)).data;

            const libraryInfo = await Promise.all(library.map(async (entry) => {
                const movieData = (await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}movies/info/${entry.imdbId}`)).data
                return movieData;
            }))

            setMovies(libraryInfo);
            
        } catch (e) {
            if (e.response.status === 401) {
                setSelectedTab('Login');
                return navigate('/login');
            }
        }
    }

    useEffect(() => {
        getLibrary();
    }, [getLibrary])

    return(
        <Box>
            <Collapse in={alert}>
                <Alert severity={alertInfo.operation === 'added' ? "success" : "error"} sx={{ mb: 2 }} onClose={() => setAlert(false)}>
                    {alertInfo.name} {alertInfo.operation} {alertInfo.operation === 'added' ? "to" : "from"} your library
                </Alert>
            </Collapse>
            <Typography variant="h5" color="initial">My Library</Typography>
            <Grid container spacing={2} justifyContent="center" direction="row" sx={{ pl: 15, pr: 15, pt: 5 }}>
                    {movies.map(movie => (
                        <Grid item key={movie.imdbId}>
                            <MovieCard movie={movie} getLibrary={getLibrary} handleAlert={handleAlert} loading={loading} setLoading={setLoading} isInLibraryPage={true}/>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    )
}

export default MyLibrary;