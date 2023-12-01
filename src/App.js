import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { Container} from '@mui/material';
import Trending from './pages/Trending/Trending';
import Series from './pages/Series/Series';
import Movies from './pages/Movies/Movies';
import Search from './pages/Search/Search';
import MainNav from './components/MainNav';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container >
          <Routes>
            <Route path='/' element={<Trending />} />
            <Route path='/series' element={<Series />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Container>
      </div>
      
      <MainNav />
    </BrowserRouter>
  );
}

export default App;
