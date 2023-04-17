import React from 'react'
import './ListingPosters.css'
import {Link} from 'react-router-dom'

function ListingPosters({listingId, movieId, coverPic, desc, title, price}) {
  return (
        <div className='poster' key={listingId}>
      {coverPic ? (        <img src={'https://image.tmdb.org/t/p/w500/' + coverPic} alt={title} className='poster-image'/>
) : (<img src={require('../../images/753134_festival_film_icon.png')} alt={title} className='poster-image' />)}
        <p>{desc.substring(0, 80)}...<Link to={`/details/${movieId}`}>Read on</Link></p>
        <p>{price}</p>
    </div>
  )
}

export default ListingPosters