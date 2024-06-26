import { Card, CardContent, CardMedia, Typography, Box, Button, Modal, Skeleton } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useEffect, useState } from "react";
import axios from "axios";


const MovieCard = ({ movie, getLibrary, handleAlert, loading, setLoading, isInLibraryPage }) => {
    const [info, setInfo] = useState({});
    const [inLibrary, setInLibrary] = useState(false);
    const [libraryId, setLibraryId] = useState(-1);
    
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const requestInfo = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}movies/info/${movie.imdbID}`);
            setInfo(response.data);
            checkLibrary(movie.imdbID);
        } catch (error) {
            console.error(error);
        }
    }

    const addToLibrary = async () => {
        try {
            setLoading(true);

            const user = (await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}auth/status`)).data;
            await axios.post(`${process.env.REACT_APP_MOOVY_BACKEND}library-entries`, {
                userId: user.id,
                imdbId: movie.imdbID
            })

            if (getLibrary !== undefined) {
               await getLibrary();
            }

            await checkLibrary(movie.imdbID)


            handleAlert(movie.Title, 'added');
            setInLibrary(true);
            setLoading(false);
        } catch (error) {
            setInLibrary(false);
            setLoading(false);
            console.error(error);
        }
    }

    const removeFromLibrary = async () => {
        try {
            setLoading(true);
            
            await axios.delete(`${process.env.REACT_APP_MOOVY_BACKEND}library-entries/`, {
                data: {
                    id: libraryId
                }
            })
            
            handleClose();
            
            setInLibrary(false);
            await checkLibrary(movie.imdbID);
            handleAlert(movie.Title, 'removed');
            setLoading(false);
        } catch (error) {
            setInLibrary(true);
            setLoading(false);
            console.error(error);
        }
    }

    const checkLibrary = async(imdbId) => {
        try {
            const user = (await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}auth/status`)).data;
            const library = await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}library-entries/${user.id}`)

            let found = await library.data.find(m => m.imdbId === imdbId);

            if (found !== undefined) {
                setLibraryId(found.id);
                setInLibrary(true);
            } else {
                setInLibrary(false);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        checkLibrary(movie.imdbID);
        requestInfo();
    }, [movie])

    return (
        <Card key={movie.imdbID} sx={{ aspectRatio: '12/23', height: 480 }}>
            {!(loading && isInLibraryPage) ? <CardMedia image={movie.Poster} title={movie.Title} sx={{position: "relative", width: 'auto', height: 340, margin: 1}}></CardMedia> : 
            <Skeleton variant="rectangular" width={235} height={340} sx={{ position: "relative", margin: 1 }}/>}
            <CardContent>
                <Box sx={{display: 'flex', flexDirection: 'row', height: 40}} alignItems={"center"}>
                    {!(loading && isInLibraryPage) ? <Typography 
                    variant="h7" 
                    fontSize={15} 
                    component="div" 
                    textAlign={"left"} 
                    textOverflow={"ellipsis"} 
                    sx={{
                        overflow: "hidden", 
                        textOverflow: "ellipsis", 
                        display: "-webkit-box", 
                        WebkitLineClamp: "2", 
                        WebkitBoxOrient: "vertical"
                        }}
                    >
                        {movie.Title}
                    </Typography> : <Skeleton variant="text" width={210} height={10} sx={{borderRadius: 1}}/>}
                    {!(loading && isInLibraryPage) ?<Box display={"flex"} sx={{ml: "auto"}}>
                        <StarIcon></StarIcon>
                        <Typography variant="h7" color="text.secondary">{info.imdbRating}</Typography>
                    </Box> : <Skeleton variant="text" width={210} height={10} sx={{borderRadius: 1}}/>}
                </Box>
                {(!loading && !inLibrary) &&
                    <Button variant="text" color="success" onClick={addToLibrary} sx={{bgcolor: 'lightgreen', fontSize: 12, width: '100%', mt: 2}}>
                        <LibraryAddIcon></LibraryAddIcon>
                        Add to Library
                    </Button>
                }
                {(!loading && inLibrary) && <>
                    <Button variant="text" onClick={handleOpen} sx={{bgcolor: 'lightsalmon', color: 'red', fontSize: 12, width: '100%', marginTop: 2}}>
                        <LibraryAddIcon></LibraryAddIcon>
                        Remove from Library
                    </Button>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Card sx={{
                        position: 'absolute',
                        width: 400,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: 4
                    }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Remove from your library
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to remove "{movie.Title}" from your library?
                        </Typography>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="contained" color="error" sx={{width: "45%"}} onClick={removeFromLibrary}>Remove</Button>
                            <Button variant="contained" sx={{bgcolor: "gray", width: "45%"}} onClick={handleClose}>Cancel</Button>
                        </Box>
                    </Card>
                    </Modal>
                </>
                }
                {loading && <Skeleton variant="rounded" width={210} height={38} sx={{marginTop: 2, borderRadius: 1}}/>}
            </CardContent>
        </Card>
    );
}

export default MovieCard;