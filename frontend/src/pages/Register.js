import React from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Input, InputAdornment, Card, Button, Alert, Collapse, IconButton } from '@mui/material';
import AccountBox from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = ({setUser, setLoggedIn}) => {

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

    const pressEnter = (e) => {
        if (e.keyCode === 13) {
          register();
        }
    };

    const register = async() => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MOOVY_BACKEND}users`, {
                username: username,
                password: password
            })

            if(response.status === 201) {
                const loginResponse = await axios.post(`${process.env.REACT_APP_MOOVY_BACKEND}auth/login`, {
                    username: username,
                    password: password
                })

                Cookies.set('token', loginResponse.data, { expires: 7, secure: true });

                axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data}`;
             
                const user = await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}auth/status`)

                setUser(user.data);

                return navigate('/my-library');
            }
        } catch (e) {
            setAlert(true);
        }
    }

    return (
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
            <Typography variant="h5" color="initial" sx={{pb: '3vh'}}>Register</Typography>
            <Box component="form" noValidate autoComplete="off" display={'flex'} flexDirection={'column'}>
                <FormControl variant="standard" sx={{pb: '3vh'}}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                    Username
                    </InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    onKeyDown={(e) => pressEnter(e)}
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
                    onKeyDown={(e) => pressEnter(e)}
                    startAdornment={
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    }
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </FormControl>
                <Button variant="contained" color="primary" onClick={register}>Register</Button>
            </Box>
        </Card>
    </Container>
    );
};

export default Register;