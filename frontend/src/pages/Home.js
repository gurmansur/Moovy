import { Box, Card, CardMedia, Typography } from "@mui/material";

const Home = () => {
    return (
        <Card sx={{display: "flex"}}>
            <Box p={5}>
                <Typography variant="h3" sx={{pb: 5, fontWeight: 700}}>Welcome to <span style={{color: "orange"}}>Moovy</span></Typography>

                <Typography variant="h4" sx={{pb: 5}}>This is a simple movie library application</Typography>

                <Typography variant="h4" sx={{pb: 5}}>You can search for movies and add them to your library</Typography>

                <Typography variant="h4" sx={{pb: 5}}>You can also view your library and remove movies from it</Typography>

                <Typography variant="h4" sx={{pb: 5}}>Please login or register to get started</Typography>
            </Box>
            <CardMedia component="img" sx={{width: "50%"}} image="./movieTheaterImage.jpg" alt="Movie" />
        </Card>
    );
};

export default Home;