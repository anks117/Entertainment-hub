import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useEffect,useState } from 'react';
import { unavailable } from '../../config/config';
import { img_500 } from '../../config/config';
import { YouTube } from '@mui/icons-material';
import './ContentModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height:'60%',
  bgcolor: '#39445a',
  border: '2px solid #282c34',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({children, type, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent]=useState();
  const [video,setVideo]=useState();

  const fetchData=async()=>{
    const data=await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const result=await data.json();
    setContent(result)
  }

  const fetchVideo=async()=>{
    const data=await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const result=await data.json();
    console.log(result);
    setVideo(result.results[0]?.key);
  }

  useEffect(()=>{
    fetchData();
    fetchVideo();
  },[]);

  return (
    <>
      <div className='media' onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && 
            <div className="ContentModal">
                <img className='ContentModal_portrait' src={content.poster_path?`${img_500}/${content.poster_path}`:unavailable} alt={content.title || content.name} />
                <img className='ContentModal_landscape' src={content.poster_path?`${img_500}/${content.backdrop_path}`:unavailable} alt={content.title || content.name} />
                <div className="ContentModal_about">
                  <span className='ContentModal_title'>
                    {content.title || content.name}(
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "----").substring(0,4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className='tagline'>{content.tagline}</i>
                  )}
                  <span className='ContentModal_description'>
                    {content.overview}
                  </span>
                  <Button 
                    variant='contained'
                    startIcon={<YouTube />}
                    color='secondary'
                    target='_blank'
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >Watch the Trailer</Button>
                </div>
            </div>
            }
          </Box>
        </Fade>
      </Modal>
    </>
  );
}