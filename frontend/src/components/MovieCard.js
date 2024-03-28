import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import axios from "axios";

const MovieCard = ({ movie }) => {

    const [info, setInfo] = useState({});

    const requestInfo = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=a58446f4&i=${movie.imdbID}`);
            setInfo(response.data);
            console.log(info);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        requestInfo();
    }, [])

    return (
        <Card key={movie.imdbID} sx={{ maxWidth: 300, height: '62vh' }}>
            <CardMedia image={movie.Poster} title={movie.Title} sx={{width: 'auto', height: '45vh', margin: '1vh'}}></CardMedia>
            {/*<img src={movie.Poster} alt={movie.Title} style={{ width: 'auto', height: '45vh', marginTop: '1vh'}}> */}
            <CardContent>
                <Typography variant="h6" component="div">{movie.Title}</Typography>
                <Typography variant="body2" color="text.secondary">{movie.Year}</Typography>
                <StarIcon></StarIcon>
                <Typography variant="h7" color="text.secondary">{info.imdbRating}</Typography>
            </CardContent>
        </Card>
    );
}

export default MovieCard;