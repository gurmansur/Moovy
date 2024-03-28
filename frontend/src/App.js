import ResponsiveAppBar from './components/ResponsiveAppBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './pages/Search';
import MyLibrary from './pages/MyLibrary';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ResponsiveAppBar/>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search className="Search"/>} />
          <Route path="/search" element={<Search  className="Search"/>} />
          <Route path="/my-library" element={<MyLibrary  className="MyLibrary"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
