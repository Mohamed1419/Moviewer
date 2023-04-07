import React, { useState } from 'react'
import { useEffect } from 'react'
import './DetailsPage.css'
import { useParams } from 'react-router-dom';

function DetailsPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [movie, setMovie] = useState([])

  const param = useParams()

  useEffect(() => {
    // fetching the movie using the params which carries its unique id and fetches from the third party API based upon that
    const getMovie = async () => {
        fetch(`https://api.themoviedb.org/3/movie/${param.id}?api_key=4b9b22d0645fd187a357f1db1a5da25e&language=en-US`)
        .then(res => res.json())
        .then(
        (result) => {
          setIsLoaded(true);
          setMovie(result);
          // testing to see results of successful fetch
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
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
        {movie.title}
      </div>
    );
  }
}

export default DetailsPage