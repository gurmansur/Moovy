import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const NavBar = () => {
    return (
        <AppBar sx={{ bgcolor: 'white ', color: 'black'}}>
            <Toolbar>
                <Typography variant="h6" component='div' sx={{
                    color: 'orange',
                    fontWeight: 700
                }}>
                    Moovy
                </Typography>
                <Box>
                    <Button color="inherit" sx={{
                        ml: 15,
                        fontWeight: 300
                    }}>
                        Search
                    </Button>
                    <Button color="inherit" sx={{
                        ml: 7,
                        fontWeight: 300
                    }}>
                        My Library
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;