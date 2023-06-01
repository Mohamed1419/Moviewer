import React from 'react'
import { useState } from 'react'
import './IndividualOffer.css'
import { updateAListing } from '../../utils/listingService'
import {Link} from 'react-router-dom'

function IndividualOffer(props) {

    const [editForm, setEditForm] = useState({
    movie_id: props.param.id.toString(),
    author: props.user, 
    price: 0.00,
        })

    let handleEditChange = (e) => {
    setEditForm({...editForm, [e.target.name]: e.target.value})
    console.log(editForm.price, editForm.author, editForm.movie_id);
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
    <div className='individual-seller-offer'>
        {props.listing.author.id === props.user ? (<p>You</p>) : (<p><Link className='underline-link' to={`/user/${props.listing.author.id}`}>{props.listing.author.username}</Link></p>)}
        {props.listing.author.id === props.user ? (

        <form className='edit-form' onSubmit={(e) => handleEditSubmit(props.listing.id)(e)} encType="multipart/form-data">
            <input name='price' placeholder={props.listing.price} onChange={handleEditChange} type='number' min='1' step='.01'></input>
            <button className='edit-btn' type='Submit' disabled={!editFormIsValid}>Confirm edit</button>
        </form>

            ) : (<p className='price'>£{props.listing.price}</p>)}
        {props.listing.author.id === props.user ? (<button className='del-btn' type='button' onClick={() => props.handleDelete(props.listing.id)}>Delete</button>) 
        : (<button type='button' onClick={() => props.initiateCheckout(props.title, props.listing.id)} className='add-to-cart-btn'>Buy now</button>)}
    </div>
  )
}

export default IndividualOffer