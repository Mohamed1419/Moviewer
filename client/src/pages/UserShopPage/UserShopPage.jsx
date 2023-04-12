import './UserShopPage.css'
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function UserShopPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let [userDetails, setUserDetails] = useState([])

    const param = useParams()

    useEffect(() => {
    // fetching the movie using the params which carries its unique id and fetches from the third party API based upon that
    const getUser = async () => {
        fetch(`http://localhost:8000/users/details/${param.id}/`)
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>{userDetails.id}</h1>
        <h1>{userDetails.username}</h1>
        <h1>{userDetails.listings[0].movie_id}</h1>
      </div>
    );
  }
}

export default UserShopPage