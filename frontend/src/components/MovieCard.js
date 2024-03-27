import { Card, CardContent, Typography } from "@mui/material";

const MovieCard = ({ movie }) => {
    return (
        <Card key={movie.imdbID} sx={{ maxWidth: 300 }}>
            <img src={movie.Poster} alt={movie.Title} style={{ width: '100%', height: 'auto' }} />
            <CardContent>
                <Typography variant="h6" component="div">{movie.Title}</Typography>
                <Typography variant="body2" color="text.secondary">{movie.Year}</Typography>
            </CardContent>
        </Card>
    );
}

export default MovieCard;