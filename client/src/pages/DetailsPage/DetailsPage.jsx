import React, { useState } from 'react'
import { useEffect } from 'react'
import './DetailsPage.css'
import { useParams } from 'react-router-dom';
import {createAListing} from '../../utils/listingService'
import userService from '../../utils/userService'
import { useNavigate } from 'react-router-dom'
import { removeAListing, updateAListing } from '../../utils/listingService';
import tokenService from '../../utils/tokenService'
import IndividualOffer from '../../components/IndividualOffer/IndividualOffer';
import { Link } from 'react-router-dom';


function DetailsPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [movie, setMovie] = useState([])
  let [movieCreds, setMovieCreds] = useState([])
  let [listings, setListings] = useState([])
  let [listings2, setListings2] = useState([])
  const param = useParams()
  const user = userService.getUser();
  const navigate = useNavigate()

  const BASE_URL = 'http://localhost:8000/api/v1/'

  const [formListing, setFormListing] = useState({
      movie_id: param.id.toString(), 
      author: user,
      price: 0.00, 
    })

  // const [editForm, setEditForm] = useState({
  //   movie_id: param.id.toString(),
  //   author: user, 
  //   price: 0.00,
  // })

  // let handleEditChange = (e) => {
  //   setEditForm({...editForm, [e.target.name]: e.target.value})
  //   console.log(editForm.price, editForm.author, editForm.movie_id);
  // }

  let handleChange = (e) => {
    setFormListing({...formListing, [e.target.name]: e.target.value})
  }

  let priceIsValid = formListing.price !== "" && formListing.price > 0
  let formIsValid = priceIsValid;

  // let editPriceIsValid = editForm.price !== '' && editForm.price > 0
  // let editFormIsValid = editPriceIsValid;

  // const [isInputTouched, setIsInputTouched] = useState(false);

  // const handleInputTouch = () => {
  //   setIsInputTouched(true);
  // };


    let handleSubmit = (e) => {
      console.log(user);
      console.log(formListing);
      e.preventDefault()
      const formData = new FormData();
      Object.keys(formListing).forEach(key => {
        if (formListing[key].constructor === Array) {
          formListing[key].forEach(item => {
            formData.append(key, item)
            console.log(formData);
          })
        } else {
          formData.append(key, formListing[key])
          console.log(formData);
          console.log(formListing);
        }
      })

        createAListing(formData).then(res => {
        console.log(formListing);
        console.log(res)
      }).then(navigate(0))
    }

    // let handleEditSubmit = (id) => (e) => {
    //   e.preventDefault()
    //   const formData = new FormData();
    //   // loop through the state of the new edit form and make an object to send to the back end 

    //   Object.keys(editForm).forEach(key => {
    //     if (editForm[key].constructor === Array) {
    //       editForm[key].forEach(item => {
    //         formData.append(key, item)
    //         console.log(formData);
    //       })
    //     } else {
    //       formData.append(key, editForm[key])
    //       console.log(formData);
    //       console.log(editForm);
    //     }
    //   })

    //   updateAListing(editForm, id).then(res => console.log(res)).then(navigate(0))
    // }

      const handleDelete = (listing) => {
        console.log('It has been called on ' + listing);
        removeAListing(listing).then(navigate(0))
      }

  useEffect(() => {

        function fetchMovie() {
          return fetch(`https://api.themoviedb.org/3/movie/${param.id}?api_key=4b9b22d0645fd187a357f1db1a5da25e&language=en-US`)
          .then(response => response.json())
          .then((res => {setMovie(res);}), (err) => {
            setError(err)
          })
        };
        
        function fetchCreds() {
          return fetch(`https://api.themoviedb.org/3/movie/${param.id}/credits?api_key=4b9b22d0645fd187a357f1db1a5da25e&language=en-US`)
          .then(response => response.json())
          .then(res => {setMovieCreds(res);}, (err) => {
            setError(err)
          });
        };


        function fetchMovieListings() {
          return fetch(BASE_URL)
            .then(response => response.json())
            .then(res => {
              setListings(res);
              return res;
            })
            .catch(err => {
              setError(err);
            });
        }


        function fetchData() {
          fetchMovie()
            .then(movieObj => {
              return Promise.all([
                fetchCreds(),
                fetchMovieListings()
              ]);
            })
            .then(([data2, data3]) => {
              setIsLoaded(true);
            })
            .catch(error => {
              setError(error);
            });
        }


  fetchData();

  
}, [])

  useEffect(() => {
    setListings2(listings.filter(el => el.movie_id === movie.id))
  }, [listings]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className='details-page' style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}}>

          <div className='details-left'>
            {
              movie.poster_path ? (<img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title} />) : (<img src={require('../../images/753134_festival_film_icon.png')} alt={movie.title}/>)
            }

            <div className='genres'>
              {movie.genres.map((genre) => (<p className='genre' key={genre.name}>{genre.name}</p>))}
            </div>
            <div className='director'>
              Directed by: {movieCreds.crew.find(o => o.job === 'Director').name}
            </div>
            <div className='genres'>
              {movieCreds.cast.slice(0, 5).map((star) => (<p className='star' key={star.name}>{star.name}</p>))}
            </div>
          </div>
          <div className='details-right'>
            <div className='title-price'>
              <div><h2>{movie.title}</h2></div>
              <div>
                {listings2.length > 0 ? (<h2>£{  Math.min(...listings2.map(item => item.price ))  }</h2>) : (<h2>None available</h2>)}
              </div>
            </div>
            <div className='description'>
              <h2>{movie.overview}</h2>
            </div>
            <div className='rating-release'>
              <h2>Viewer rating: {movie.vote_average}/10</h2>
              <h2>Release date: {movie.release_date}</h2>
            </div>
            <div className='offers'>
              <h2>Offers available:</h2>


              {listings2.length > 0 ? (listings2.map((listing) => (
                <>
                  {/* <IndividualOffer key={listing.id} param={param} navigate={navigate} listing={listing} handleEditChange={handleEditChange} handleEditSubmit={handleEditSubmit} handleDelete={handleDelete} user={user} editFormIsValid={editFormIsValid} /> */}
                  <IndividualOffer key={listing.id} param={param} navigate={navigate} listing={listing} handleDelete={handleDelete} user={user}  />
                

                  {/* <div className='seller-offer' key={listing.id}>
                    {listing.author.id === user ? (<p>You</p>) : (<p>{listing.author.username}</p>)}
                    {listing.author.id === user ? (

                    <form className='edit-form' onSubmit={(e) => handleEditSubmit(listing.id)(e)} encType="multipart/form-data">
                      <input name='price' placeholder={listing.price} onChange={handleEditChange} type='number' min='1' step='.01'></input>
                      <button className='del-btn' type='Submit' disabled={!editFormIsValid}>Confirm edit</button>
                    </form>


                      ) : (<p>£{listing.price}</p>)}
                    {listing.author.id === user ? (<button className='del-btn' type='button' onClick={() => handleDelete(listing.id)}>Delete</button>) : (<button className='add-to-cart-btn'>Add to cart</button>)}
                  </div> */}

                </>


              ))) : (<h2>None currently available</h2>)}
            </div>
            
            <div className='sell-form'>
            <h3>Have one to sell?</h3>

            {
              user ? ( 
              <form className='form' onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Price:</label>
                <input name='price' value={formListing.price} onChange={handleChange} type="number" min="1" step=".01"></input>
                <button type='Submit' disabled={!formIsValid} className='add-to-cart-btn'>Confirm listing</button>
              </form>
            ) : (<p className='signup-message'>Please <Link className='underline-link' to={'/login'}>login</Link> or <Link className='underline-link' to={'/signup'}>register</Link> to sell yours today!</p>)
            }

          </div>

          </div>
        </div>



          
      </div>
    );
  }
}

export default DetailsPage