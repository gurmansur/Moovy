import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './pages/Search';
import MyLibrary from './pages/MyLibrary';
import axios from 'axios';
import './App.css';
import Container from '@mui/material/Container'

const token3 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJHYWxhY3RpY1NhbSIsImlhdCI6MTcxMjAxNjIzMiwiZXhwIjoxNzEyMTg5MDMyfQ.n6zbxB7maXT4SNU1UD5pQc94AfNpaXDcQNYvz2sqU44`;
axios.defaults.headers.common['Authorization'] = `Bearer ${token3}` 


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
