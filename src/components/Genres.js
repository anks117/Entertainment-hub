import { Chip } from '@mui/material';
import React, { useEffect } from 'react'

const Genres = ({type,genres,setGenres,selectedGenres, setSelectedGenres, setPage}) => {

    
    const handleAdd=(genre)=>{
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id!==genre.id));
        setPage(1);
    }
    const handleRemove=(genre)=>{
        setSelectedGenres(
            selectedGenres.filter((selected)=> selected.id!==genre.id)
        );
        setGenres([...genres,genre]);
        setPage(1);
    }

    const fetchGenres=async()=>{
        const data=await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        const result=await data.json();
        setGenres(result.genres);
    }
    console.log(genres);
    
    useEffect(()=>{
        fetchGenres();
       return()=>{
        setGenres({});
       };
       
    },[]);

   

  return (
    <div style={{padding:'6px 0'}}>

        {selectedGenres && selectedGenres.map((genre)=>{
          
               return <Chip 
                style={{margin:2}} 
                color='primary'
                label={genre.name} 
                size='small' 
                key={genre.id} 
                clickable
                onDelete={()=>handleRemove(genre)}
                />
        })}

        {genres && genres.map((genre)=>{
          return <Chip 
            style={{margin:2}}  
            label={genre.name} 
            size='small' 
            key={genre.id} 
            clickable
            onClick={()=>handleAdd(genre)}
            />
        
        })}
    </div>
  )
}

export default Genres