import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { getListing } from '../../utils/listingService'
import './Poster.css'

function Poster({id, coverPic, desc, title}) {
//   let [movie, setMovie] = useState([]);
//   let [tags, setTags] = useState([]);
//   useEffect(() => {
//     getBlogs();
//     getTags();
//   }, []);
//     useEffect()
//     getListing(movie.tt_url.substring(31))

//     const {isInStock , setStock } = useState(
//         for (let i = 0; i < )
//         movie.tt_url.substring(31)
//         )

//     let stock = isInStock ? (
//         <div className='flex'>
//             <div>{movie.jsonnnob.price}</div>
//             <button>Add to basket</button>
//         </div>
//     ) : (<div>Not in stock!</div>)


    

  return (
    <div className='poster'>
      {coverPic ? (        <img src={'https://image.tmdb.org/t/p/w500/' + coverPic} alt={title} className='poster-image'/>
) : (<img src={require('../../images/753134_festival_film_icon.png')} alt={title} className='poster-image' />)}
        <p>{desc.substring(0, 80)}...<Link to={`/details/${id}`}>Read on</Link></p>
        {/* {stock} */}
    </div>
  )
}

export default Poster