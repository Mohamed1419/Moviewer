import React from 'react'
import { useState } from 'react'
import './ListingPosters.css'
import {Link} from 'react-router-dom'
import { updateAListing } from '../../utils/listingService'


function ListingPosters(props) {

    const [editForm, setEditForm] = useState({
    movie_id: props.listing.movie_id,
    author: props.user, 
    price: 0.00,
  })

  let handleEditChange = (e) => {

    // console.log(props.listing, props.userListings);

    setEditForm({...editForm, [e.target.name]: e.target.value})
    console.log(editForm.movie_id, editForm.author, editForm.price);
  }

    let editPriceIsValid = editForm.price !== '' && editForm.price > 0
    let editFormIsValid = editPriceIsValid;

    let handleEditSubmit = (id) => (e) => {
      e.preventDefault()
      const formData = new FormData();
      // loop through the state of the new edit form and make an object to send to the back end 

      Object.keys(editForm).forEach(key => {
        if (editForm[key].constructor === Array) {
          editForm[key].forEach(item => {
            formData.append(key, item)
            console.log(formData);
          })
        } else {
          formData.append(key, editForm[key])
          console.log(formData);
          console.log(editForm);
        }
      })

      updateAListing(editForm, id).then(res => console.log(res)).then(props.navigate(0))
    }

  return (
        <div className='listing-poster'>
          {props.userListings.poster_path ? ( <img src={'https://image.tmdb.org/t/p/w500/' + props.userListings.poster_path} alt={props.userListings.title} className='poster-image'/>
                        ) : (<img src={require('../../images/753134_festival_film_icon.png')} alt={props.userListings.title} className='poster-image' />)}
            <p>{props.userListings.overview.substring(0, 80)}...<Link to={`/details/${props.listing.movie_id}`}>Read on</Link></p>
            
            {props.listing.author.id === props.user ? (
              <div>
                <form onSubmit={(e) => handleEditSubmit(props.listing.id)(e)} encType="multipart/form-data">
                    <input name='price' placeholder={props.listing.price} onChange={handleEditChange} type='number' min='1' step='.01'></input>
                    <button className='edit-btn' type='Submit' disabled={!editFormIsValid}>Confirm edit</button>
                </form>
                <button className='profile-del-btn' type='button' onClick={() => props.handleDelete(props.listing.id)}>Delete Listing</button>
              </div>
            ) : (
              <div>
                <p className='price'>{props.listing.price}</p>
                <button className='buy-now-btn'>Buy now</button>
              </div>
            )}
        </div>
  )
}

export default ListingPosters