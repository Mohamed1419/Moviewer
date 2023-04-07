import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './HomePage.css'

function HomePage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [movies, setMovies] = useState([])

  useEffect(() => {
    // fetching the most popular movies, which is provided by the third party api
    const getMovies = async () => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=4b9b22d0645fd187a357f1db1a5da25e&language=en-US&page=1')
        .then(res => res.json())
        .then(
        (result) => {
          setIsLoaded(true);
          setMovies(result);
          // testing to see results of successful fetch
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })}


  getMovies();
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {movies.results.map((movie) => (<div>{movie.title}</div>))
        }
      </div>
    );
  }
}

export default HomePage