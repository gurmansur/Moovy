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
import React from "react";

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ResponsiveAppBar/>
        </header>
        <Container>
            <Routes>
              <Route path="/" exact element={<Home className="Home"/>} />
              <Route path="/login" element={<Login className="Login"/>} />
              <Route path="/register" element={<Register className="Register"/>} />
              <Route path="/search" element={<Search  className="Search"/>} />
              <Route path="/my-library" element={<MyLibrary  className="MyLibrary"/>} />
            </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
