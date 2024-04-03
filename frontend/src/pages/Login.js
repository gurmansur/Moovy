import React from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Input, InputAdornment, Card, Button, Alert, Collapse, IconButton } from '@mui/material';
import AccountBox from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({setUser, setLoggedIn}) => {

    const login = async(username, password) => {
        try{
            const response = await axios.post('http://localhost:3001/auth/login', {
                username: username,
                password: password
            })

            Cookies.set('token', response.data, { expires: 7, secure: true });

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

            const user = await axios.get('http://localhost:3001/auth/status')

            setUser(user.data);

            return navigate('/my-library');
        } catch (e) {
            console.error(e);
            setAlert(true);
        }
    }

const [username, setUsername] = React.useState('');
const [password, setPassword] = React.useState('');
const [alert, setAlert] = React.useState(false);
const navigate = useNavigate();

const handleUsernameChange = (event) => {
    setUsername(event.target.value);
};

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
};

return (
    <Box>
        <Container maxWidth="xs">
            <Collapse in={alert}>
                <Alert
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setAlert(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                severity="error"
                sx={{ mb: 2 }}
                >
                Invalid username or password
                </Alert>
            </Collapse>
            <Card sx={{p: '10%'}}>
                <Typography variant="h5" color="initial" sx={{pb: '3vh'}}>Login</Typography>
                <Box component="form" noValidate autoComplete="off" display={'flex'} flexDirection={'column'}>
                    <FormControl variant="standard" sx={{pb: '3vh'}}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Username
                        </InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountBox />
                            </InputAdornment>
                        }
                        value={username}
                        onChange={handleUsernameChange}
                        />
                    </FormControl>
                    <FormControl variant="standard" sx={{pb: '3vh'}}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                        Password
                        </InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        type='password'
                        startAdornment={
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        }
                        value={password}
                        onChange={handlePasswordChange}
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={() => login(username, password)}>Login</Button>
                </Box>
            </Card>
        </Container>
    </Box>
);
};

export default Login;