import React, { useEffect, useState } from 'react'
import { Button, Tab, Tabs, TextField, ThemeProvider, createTheme, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SingleContent from '../SingleContent';
import CustomPagination from '../../components/CustomPagination/CustomPagination';


const Search = () => {

  const [type, setType]=useState(0);
  const [page,setPage]=useState();
  const [searchText,setSearchText]=useState("");
  const [content, setContent]=useState([]);
  const [numOfPages,setNumOfPages]=useState()

 
  const darkTheme=createTheme({
    palette:{
      type:'dark',
      primary:{
        main:'#fff',
      },
    },
  });

  const fetchSearchText=async()=>{
    const data=await fetch(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
    const result=await data.json();
    setContent(result.results);
    setNumOfPages(result.total_pages);
  }

  useEffect(()=>{
    fetchSearchText();
    window.scroll(0,0);
  },[type,page]);


  return (
    <>
      <ThemeProvider theme={darkTheme}>

      <div style={{display:'flex', margin:'15px 0'}}>
        <TextField 
        style={{flex:1}} 
        className='searchBox' 
        label="Search" 
        variant='filled'
        onChange={(e)=>setSearchText(e.target.value)}
        />

        <Button variant="contained" style={{marginLeft:10}} onClick={fetchSearchText}><SearchIcon /> </Button>
      </div>
      

      <Tabs value={type} textColor="primary" indicatorColor="primary"
        onChange={(e,newValue)=>{
          setType(newValue);
          setPage(1);}} 
          style={{paddingBottom:5 ,marginBottom:'10px'}}
      >
      <Tab style={{width:'50%'}} label="Search Movies" />
      <Tab style={{width:'50%'}} label="Search TV Series" />

      </Tabs>
      </ThemeProvider>

      <div className="trending">
        {content && content.map((c)=>{
          return <SingleContent
            key={c.id} 
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            type={type?'tv':'movie'}
            date={c.release_date}
            vote={c.vote_average}
          />
        })}
        {searchText && 
        !content && 
        (type? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages >1 &&(
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  )
}

export default Search