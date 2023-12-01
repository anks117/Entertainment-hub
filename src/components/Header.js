import React from 'react'
import './header.css';
const Header = () => {
  return (
        <span style={{cursor:'pointer'}} onClick={()=>window.scroll(0,0)} className='header'>🎬 ENTERTAINMENT HUB 🎭</span>
  ); 
}

export default Header;