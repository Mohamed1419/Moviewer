import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { getListing } from '../../utils/listingService'
import './Poster.css'

function Poster({id, coverPic, desc, title}) {
  return (
    <div className='poster'>
      {coverPic ? ( <Link to={`/details/${id}`}><img src={'https://image.tmdb.org/t/p/w500/' + coverPic} alt={title} className='poster-image'/></Link>
      ) : (<Link to={`/details/${id}`}><img src={require('../../images/753134_festival_film_icon.png')} alt={title} className='poster-image' /></Link>)}
      <p>{desc.substring(0, 80)}...<Link to={`/details/${id}`}>Read on</Link></p>
    </div>
  )
}

export default Poster