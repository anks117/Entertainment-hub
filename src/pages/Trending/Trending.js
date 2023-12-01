
import React, { useEffect, useState } from 'react'
import SingleContent from '../SingleContent';

import CustomPagination from '../../components/CustomPagination/CustomPagination';


const Trending = () => {

  const [pages,setPages]=useState(1);
  const [content,setContent]=useState([]);

   async function fetchTrending(){
      const data=await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${pages}`);
      const result=await data.json();
      console.log(result.results);
      setContent(result.results);
   }

  useEffect(()=>{
    fetchTrending();
  },[pages]);
  
  return (
    <>
    
      <h2 className='page-title'>Trending</h2>
      
      <div className='trending'>
        {content.map(movie=>{
          return(
            <SingleContent 
              key={movie.id} 
              id={movie.id} 
              title={movie.title || movie.name} 
              poster={movie.poster_path} 
              type={movie.media_type} 
              date={movie.release_date}
              vote={movie.vote_average} 
              
              />
          );
        })}
      </div>
      <CustomPagination setPage={setPages} numOfPages='10'/>
    </>
  )
}

export default Trending