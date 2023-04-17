import './UserShopPage.css'
import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import useUser from "../../hooks/UseUser";
import { getUserDetails } from '../../utils/listingService';
import Poster from '../../components/Poster/Poster';



function UserShopPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let [userDetails, setUserDetails] = useState('')
    let [userListings, setUserListings] = useState([])
    let navigate = useNavigate();


    const BASE_URL = "http://localhost:8000/"; // Note: Once deployed this should be updated.

    const param = useParams()

    useEffect(() => {
    // fetching the movie using the params which carries its unique id and fetches from the third party API based upon that
    const getUser = async () => {
        fetch(BASE_URL + `users/details/${param.id}/`)
        .then(res => res.json())
        .then(
        (result) => {
          setIsLoaded(true);
          setUserDetails(result);
          if (result) {getMovies(result)}
          // testing to see results of successful fetch
          console.log(result);
        },
        (error) => {
          setIsLoaded(true)
          setError(error);
        })}


      // then get all the movie ids and run a request to the movies API to get the details of all those movies

        const getMovies = async (res) => {
      try {
        userListings = await Promise.all(res.listings.map(listing => fetch(`https://api.themoviedb.org/3/movie/${listing.movie_id}?api_key=4b9b22d0645fd187a357f1db1a5da25e&language=en-US`).then(res => res.json())));
        setUserListings(userListings);
        console.log('get user has run ssuccessfully');
        console.log(userListings);
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true)
        console.log(error);
      }
    };

    getUser();


  }, [param])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>{userDetails.username}'s store</h1>
         <div className='posters-section'>
          {
            userListings.map((movie) => (
              <Poster id={movie.id} coverPic={movie.poster_path} desc={movie.overview} title={movie.title} key={movie.id} />
              ))
            }
        </div>

      </div>
    );
  }
}

export default UserShopPage