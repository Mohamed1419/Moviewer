import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Poster from '../../components/Poster/Poster'
import './HomePage.css'

function HomePage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [movies, setMovies] = useState([])
  let [pageCounter, setPageCounter] = useState(2)

  useEffect(() => {
    // fetching the most popular movies, which is provided by the third party api
    const getMovies = async () => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=4b9b22d0645fd187a357f1db1a5da25e&language=en-US&page=1')
        .then(res => res.json())
        .then(
        (result) => {
          setIsLoaded(true);
          setMovies(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })}


  getMovies();
  }, [])

  const loadMore = () => {
    setPageCounter((prevPageCounter) => prevPageCounter + 1);

    const getMoreMovies = async () => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=4b9b22d0645fd187a357f1db1a5da25e&language=en-US&page=' + pageCounter)
        .then(res => res.json())
        .then(
        (result) => {
          setMovies((prevMovies) => ({
            ...prevMovies,
            results: [...prevMovies.results, ...result.results]
          }));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }).then(
          setIsLoaded(true)
        )}

        getMoreMovies()
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='homepage'>
        <h1 className='title'>Trending Movies</h1>
        <hr />
        <div className='posters-section'>
          {
            movies.results.map((movie) => (
              <Poster id={movie.id} coverPic={movie.poster_path} desc={movie.overview} title={movie.title} key={movie.id} />
              ))
            }
        </div>
        {
          pageCounter < movies.total_pages && movies.total_results > 20 ? (
            <button className='load-more-btn' onClick={loadMore}>Load more</button>
          ) : null
        }
      </div>
    );
  }
}

export default HomePage