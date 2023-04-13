import './UserShopPage.css'
import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import useUser from "../../hooks/UseUser";
import { getUserDetails } from '../../utils/listingService';



function UserShopPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let [userDetails, setUserDetails] = useState('')
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
          
          // testing to see results of successful fetch
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })}

    getUser();
    // console.log(getUserDetails(param.id));

  }, [param])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>{userDetails.id}</h1>
        <h1>{userDetails.username}</h1>
        <h1>no of listings: {userDetails.listings.length}</h1>
      </div>
    );
  }
}

export default UserShopPage