import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './pages/Search';
import MyLibrary from './pages/MyLibrary';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import axios from 'axios';
import './App.css';
import Container from '@mui/material/Container';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const App = () => {

  const [user, setUser] = useState({});
  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    getUserFromToken();
  }, []);

  const getUserFromToken = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        return;
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${process.env.REACT_APP_MOOVY_BACKEND}auth/status`);
      setUser(response.data);
    }
    catch (e) {
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ResponsiveAppBar user={user} setUser={setUser} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        </header>
        <Container>
            <Routes>
              <Route path="/" exact element={<Home className="Home"/>} />
              <Route path="/login" element={<Login className="Login" setUser={setUser}/>} />
              <Route path="/register" element={<Register className="Register" setUser={setUser}/>} />
              <Route path="/search" element={<Search  className="Search" setSelectedTab={setSelectedTab}/>} />
              <Route path="/my-library" element={<MyLibrary  className="MyLibrary" setSelectedTab={setSelectedTab}/>} />
            </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
