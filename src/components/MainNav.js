import React from 'react'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SearchIcon from '@mui/icons-material/Search';
import './MainNav.css';
import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <div className='navigation-bar'>
      <Link style={{textDecoration:'none'}} to={"/"}>
        <div className='nav-name'>
          <WhatshotIcon />
          <p>Trending</p>
        </div>
      </Link>
      <Link style={{textDecoration:'none'}} to={"/movies"}>
        <div className='nav-name'>
          <MovieFilterIcon />
          <p>Movies</p>
        </div>
      </Link>
      <Link style={{textDecoration:'none'}} to={"/series"}>
        <div className='nav-name'>
          <OndemandVideoIcon />
          <p>Series</p>
        </div>
      </Link>
      <Link style={{textDecoration:'none'}} to={"/search"}>
        <div className='nav-name'>
          <SearchIcon />
          <p>Search</p>
        </div>
      </Link>
    </div>
  )
}

export default MainNav