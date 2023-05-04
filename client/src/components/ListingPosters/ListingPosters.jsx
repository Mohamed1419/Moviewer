import React from 'react'
import './ListingPosters.css'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'





function ListingPosters({listingId, movieId, coverPic, desc, title, price, author, user, removeAListing, editForm, setEditForm, handleEditSubmit}) {

  const navigate = useNavigate()

  const handleDelete = (listing) => {
  console.log('It has been called on ' + listing);
  removeAListing(listing).then(navigate(0))
}

  let handleEditChange = (e) => {
    setEditForm({...editForm, [e.target.name]: e.target.value})
    console.log(editForm.price, editForm.author, editForm.movie_id);
  }

    let editPriceIsValid = editForm.price !== '' && editForm.price > 0
  let editFormIsValid = editPriceIsValid;

  return (
        <div className='listing-poster' key={listingId}>
          {coverPic ? ( <img src={'https://image.tmdb.org/t/p/w500/' + coverPic} alt={title} className='poster-image'/>
                        ) : (<img src={require('../../images/753134_festival_film_icon.png')} alt={title} className='poster-image' />)}
            <p>{desc.substring(0, 80)}...<Link to={`/details/${movieId}`}>Read on</Link></p>
            {author === user ? (
              <div>
                <form onSubmit={(e) => handleEditSubmit(listingId)(e)} encType="multipart/form-data">
                    <input name='price' placeholder={price} onChange={handleEditChange} type='number' min='1' step='.01'></input>
                    <button className='del-btn' type='Submit' disabled={!editFormIsValid}>Confirm edit</button>
                </form>
                <button type='button' onClick={() => handleDelete(listingId)}>Delete Listing</button>
              </div>
            ) : (
              <div>
                <p>{price}</p>
                <button>Buy now</button>
              </div>
            )}
        </div>
  )
}

export default ListingPosters