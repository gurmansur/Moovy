import React from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Input, InputAdornment, Card, Button } from '@mui/material';
import AccountBox from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const login = async(username, password) => {
        const response = await axios.post('http://localhost:3001/auth/login', {
            username: username,
            password: password
        }).catch(error => {
            console.log(error);
            return error;
        });

        console.log(response.data);

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

        return navigate('/my-library');
    }

const [username, setUsername] = React.useState('');
const [password, setPassword] = React.useState('');
const navigate = useNavigate();

const handleUsernameChange = (event) => {
    setUsername(event.target.value);
};

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
};

return (
    <Container maxWidth="xs">
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
);
};

export default Login;