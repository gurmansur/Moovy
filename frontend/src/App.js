import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './pages/Search';
import MyLibrary from './pages/MyLibrary';
import axios from 'axios';
import './App.css';
import Container from '@mui/material/Container'

const token1 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJHYWxhY3RpY1NhbSIsImlhdCI6MTcxMTk5OTU4MywiZXhwIjoxNzEyMTcyMzgzfQ.UKbdzjqlcUD6TTL1J8jgAgibEI2PbNxx_He8kVVLXT8`;
const token2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJTYW0iLCJpYXQiOjE3MTIwMDAyMzQsImV4cCI6MTcxMjE3MzAzNH0.c_SP4Gy7Zq3fXDCEq9YMQIZqtQuzmERrtgu92-GvzhY`;
axios.defaults.headers.common['Authorization'] = `Bearer ${token1}` 


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ResponsiveAppBar/>
      </header>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search className="Search"/>} />
            <Route path="/search" element={<Search  className="Search"/>} />
            <Route path="/my-library" element={<MyLibrary  className="MyLibrary"/>} />
          </Routes>
        </BrowserRouter> 
      </Container>
    </div>
  );
}

export default App;
