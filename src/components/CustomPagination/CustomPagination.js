import React from 'react'
import Pagination from '@mui/material/Pagination';

const CustomPagination = ({setPage, numOfPages}) => {
    function handleChange(page){
        setPage(page);
        window.scroll(0,0);
    }
  
  return (
    <div style={{display:'flex', justifyContent:'center',marginBottom:'1rem', paddingTop:'1.5rem' ,paddingBottom:'2.1rem'}}>
      <Pagination onChange={(e)=>handleChange(e.target.textContent)}  count={numOfPages} color='primary' />
    </div>
  )
}

export default CustomPagination