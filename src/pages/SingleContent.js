import React from 'react';
import { img_300 ,unavailable } from '../config/config';
import './Singlecontent.css';
import Badge from '@mui/material/Badge';
import ContentModal from '../components/ContentModal/ContentModal';



const SingleContent = ({
    key,
    id,
    title,
    poster,
    type,
    date,
    vote
}) => {
  return (
    <ContentModal type={type} id={id}>
    <Badge badgeContent={vote} color={vote >8 ? "primary" : "secondary"}/>
        <img className='poster' src={poster ? `${img_300}${poster}` : unavailable }   alt={title} />
        <b className='title'>{title}</b>
        <span className='subtitle'>{type==='tv' ? "TV Series" : "Movie"}
        <span className='date'>{date}</span>
        </span>
    </ContentModal>
  )
}

export default SingleContent