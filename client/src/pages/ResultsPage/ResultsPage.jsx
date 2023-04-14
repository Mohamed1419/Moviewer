import React from 'react'
import './ResultsPage.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ResultsPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [movies, setMovies] = useState([])

  let param = useParams()

  useEffect(() => {
    // fetching the movie using the params which carries its unique id and fetches from the third party API based upon that
    const getMovie = async () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4b9b22d0645fd187a357f1db1a5da25e&query=${param.query}`)
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


  getMovie();
  }, [param])


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {
          movies.results.map((movie) => (<Link to={`/details/${movie.id}`} key={movie.id}><div>{movie.title}</div></Link>))
        }
      </div>
    );
  }
}

export default ResultsPage