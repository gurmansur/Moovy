import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useEffect, useState } from "react";
import axios from "axios";

const MovieCard = ({ movie }) => {

    const [info, setInfo] = useState({});
    const [inLibrary, setInLibrary] = useState(false);
    const [libraryId, setLibraryId] = useState(-1);

    const requestInfo = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3001/movies/info/${movie.imdbID}`);
            setInfo(response.data);
            checkLibrary(movie.imdbID);
        } catch (error) {
            console.error(error);
        }
    }

    const addToLibrary = async () => {
        try {
            const user = (await axios.get('http://127.0.0.1:3001/auth/status')).data;
            axios.post('http://127.0.0.1:3001/library-entries', {
                userId: user.id,
                imdbId: movie.imdbID
            })

            requestInfo();
            setInLibrary(true);
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromLibrary = () => {
        try {
            axios.delete('http://127.0.0.1:3001/library-entries/', {
                data: {
                    id: libraryId
                }
            })

            requestInfo();
            setInLibrary(false);
        } catch (error) {
            console.error(error);
        }
    }

    const checkLibrary = async(imdbId) => {
        const user = (await axios.get('http://127.0.0.1:3001/auth/status')).data;
        const library = await axios.get(`http://127.0.0.1:3001/library-entries/${user.id}`)

        let found = library.data.find(m => m.imdbId === imdbId);

        setInLibrary(found !== undefined);

        if (found !== undefined) {
            setLibraryId(found.id);
        }
    }

    useEffect(() => {
        requestInfo();
    }, [movie])

    return (
        <Card key={movie.imdbID} sx={{ aspectRatio: '12/23' }}>
            <CardMedia image={movie.Poster} title={movie.Title} sx={{width: 'auto', height: '60%', margin: '1vh'}}></CardMedia>
            <CardContent>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Typography 
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
                    </Typography>
                    <StarIcon></StarIcon>
                    <Typography variant="h7" color="text.secondary">{info.imdbRating}</Typography>
                </Box>
                {!inLibrary ? 
                    <Button variant="text" color="success" onClick={addToLibrary} sx={{bgcolor: 'lightgreen', fontSize: 12, width: '100%', marginTop: '3vh'}}>
                        <LibraryAddIcon></LibraryAddIcon>
                        Add to Library
                    </Button>
                :
                    <Button variant="text" onClick={removeFromLibrary} sx={{bgcolor: 'lightsalmon', color: 'red', fontSize: 12, width: '100%', marginTop: '3vh'}}>
                        <LibraryAddIcon></LibraryAddIcon>
                        Remove from Library
                    </Button>
                }
            </CardContent>
        </Card>
    );
}

export default MovieCard;