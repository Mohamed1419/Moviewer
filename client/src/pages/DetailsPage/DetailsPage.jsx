import React, { useState } from 'react'
import { useEffect } from 'react'
import './DetailsPage.css'
import { useParams } from 'react-router-dom';
import {createAListing} from '../../utils/listingService'
import userService from '../../utils/userService'

function DetailsPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [movie, setMovie] = useState([])
  let [movieCreds, setMovieCreds] = useState([])
  const param = useParams()
  const user = userService.getUser();

  const [formListing, setFormListing] = useState({
      movie_id: param.id.toString(), 
      author: user,
      price: 0.00, 
    })

    let priceIsValid = formListing.price !== "" && formListing.price > 0
    let formIsValid = priceIsValid;


    let handleChange = (e) => {
      setFormListing({...formListing, [e.target.name]: e.target.value})
    }
  
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
        }
      })

        createAListing(formData).then(res => {
        console.log(res)
      })
    }

  useEffect(() => {
    // fetching the movie using the params which carries its unique id and fetches from the third party API based upon that
    const getMovie = async () => {
        fetch(`https://api.themoviedb.org/3/movie/${param.id}?api_key=4b9b22d0645fd187a357f1db1a5da25e&language=en-US`)
        .then(res => res.json())
        .then(
        (result) => {
          setMovie(result);
          if (result) {getMovieCreds(result.id)}
          // testing to see results of successful fetch
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })}

    const getMovieCreds = async (res) => {
        fetch(`https://api.themoviedb.org/3/movie/${res}/credits?api_key=4b9b22d0645fd187a357f1db1a5da25e&language=en-US`)
        .then(res => res.json())
        .then(
        (result) => {
          setMovieCreds(result);
          setIsLoaded(true)
          // testing to see results of successful fetch
          console.log(result);
        },
        (error) => {
          setError(error);
        })}


  getMovie();

  }, [])


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className='details-page'>
          <div className='details-left'>
            <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title} />
            <div className='genres'>
              {movie.genres.map((genre) => (<p className='genre'>{genre.name}</p>))}
            </div>
            <div className='director'>
              Directed by: {movieCreds.crew.find(o => o.job === 'Director').name}
            </div>
            <div className='genres'>
              {movieCreds.cast.slice(0, 5).map((star) => (<p className='star'>{star.name}</p>))}
            </div>
          </div>
          <div className='details-right'>

          </div>
        </div>


          <div className='sell-form'>
            <h3>Have one to sell?</h3>
            <form className='form' onSubmit={handleSubmit} encType="multipart/form-data">
              <label>Price</label>
              <input name='price' value={formListing.price} onChange={handleChange} type="number" min="1" step=".01"></input>
              <button type='Submit' disabled={!formIsValid}>Confirm listing</button>
            </form>
          </div>
      </div>
    );
  }
}

export default DetailsPage