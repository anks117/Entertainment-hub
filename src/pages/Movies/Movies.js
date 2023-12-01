import React, { useEffect, useState } from 'react'
import SingleContent from '../SingleContent';
import CustomPagination from '../../components/CustomPagination/CustomPagination';
import Genres from '../../components/Genres';
import useGenres from '../../hooks/useGenre';

const Movies = () => {

  const [pages, setPages]=useState(1);
  const [numOfPages,setNumOfPages]=useState();
  const [content, setContent]=useState([]);
  const [selectedGenres, setSelectedGenres]=useState([]);
  const [genres, setGenres]=useState([]);
  const genreforURL=useGenres(selectedGenres);

  const fetchMovies=async ()=>{
    const data=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pages}&with_genres=${genreforURL}`);
    const result=await data.json();
    setContent(result.results);
    setNumOfPages(result.total_pages);
  }

  useEffect(()=>{
    fetchMovies();
  },[pages, genreforURL]);


  return (
    <div>
      <h2 className='page-title'>Movies</h2>
      <Genres 
        type='movie'
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPages}
      />

      <div className='trending'>
        {content.map(c=>{
          return <SingleContent 
              key={c.id} 
              id={c.id} 
              title={c.title || c.name} 
              poster={c.poster_path} 
              type='movie' 
              date={c.release_date}
              vote={c.vote_average} 
              
              />
      
        })}
      </div>
      {numOfPages >1 &&(
      <CustomPagination setPage={setPages} numOfPages={numOfPages}/>
      )}
    </div>
  )
}

export default Movies