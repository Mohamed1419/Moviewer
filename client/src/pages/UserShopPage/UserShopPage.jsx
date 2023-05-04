import './UserShopPage.css'
import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import useUser from "../../hooks/UseUser";
import { getUserDetails } from '../../utils/listingService';
import Poster from '../../components/Poster/Poster';
import ListingPosters from '../../components/ListingPosters/ListingPosters'; 
import { removeAListing, updateAListing } from '../../utils/listingService';



function UserShopPage() {
    const user = useUser();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let [userDetails, setUserDetails] = useState('')
    let [userListings, setUserListings] = useState([])
    let navigate = useNavigate();


    const BASE_URL = "http://localhost:8000/"; // Note: Once deployed this should be updated.

    const param = useParams()

    const [editForm, setEditForm] = useState({
    movie_id: param.id.toString(),
    author: user, 
    price: 0.00,
  })

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

      updateAListing(editForm, id).then(res => console.log(res)).then(navigate(0))
    }

        const handleDelete = (listing) => {
        console.log('It has been called on ' + listing);
        removeAListing(listing).then(navigate(0))
      }

    useEffect(() => {
    // fetching the movie using the params which carries its unique id and fetches from the third party API based upon that
    const getUser = async () => {
        fetch(BASE_URL + `users/details/${param.id}/`)
        .then(res => res.json())
        .then(
        (result) => {
          // setIsLoaded(true);
          setUserDetails(result);
          // console.log(userDetails);
          if (result) {getMovies(result)}
          // testing to see results of successful fetch
          // console.log(result);
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
        // console.log(userListings);
        // console.log(userDetails);
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
        <h1 className='store-title'>{userDetails.username}'s store</h1>
         <div className='posters-section'>
          {
            userDetails.listings.map((listing, index) => (
              <ListingPosters key={listing.id}
                navigate={navigate}
                param={param}
                listing={listing}
                userListings={userListings[index]} 
                user={user.user} 
                handleDelete={handleDelete}
              />
              ))
            }
        </div>

      </div>
    );
  }
}

export default UserShopPage