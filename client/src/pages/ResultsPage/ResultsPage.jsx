import React from 'react'
import './ResultsPage.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Poster from '../../components/Poster/Poster';

function ResultsPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [movies, setMovies] = useState([])
  let [resultsPageCounter, setResultsPageCounter] = useState(2)


  let param = useParams()

  useEffect(() => {
    // set resultsPageCounter to original
    setResultsPageCounter(2)
    // fetching the movie using the params which carries its unique id and fetches from the third party API based upon that
    const getMovie = async () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4b9b22d0645fd187a357f1db1a5da25e&query=${param.query}`)
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


  getMovie();
  }, [param])

    const loadMore = () => {
    setResultsPageCounter((prevPageCounter) => prevPageCounter + 1);

    const getMoreMovies = async () => {
      
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4b9b22d0645fd187a357f1db1a5da25e&query=${param.query}&page=${resultsPageCounter}`)
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
      <div>
        <h1 className='title'>Results for "{param.query}"</h1>
        <hr />
        <div className='posters-section'>
            {
              movies.results.map((movie) => (
                <Poster id={movie.id} coverPic={movie.poster_path} desc={movie.overview} title={movie.title} key={movie.id} />
                ))
              }
        </div>
        {
          resultsPageCounter <= movies.total_pages && movies.total_results > 20 ? (
            <button className='load-more-btn' onClick={loadMore}>Load more</button>
          ) : null
        }
      </div>
    );
  }
}

export default ResultsPage