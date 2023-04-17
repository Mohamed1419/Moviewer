import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useUser from "../../hooks/UseUser";
import "./Navbar.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import { getUserDetails } from "../../utils/listingService";


const NavBar = () => {
  const { handleLogout, user } = useUser();

  
  let [UserDetails, setUserDetails] = useState('')
  
  const getUserDetails = async (userID) => {
    try {
      let res = await fetch(`http://localhost:8000/users/details/${userID}`);
      console.log(res.json());
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  // if (user) {
  //   setUserDetails(getUserDetails(user))
  // }

  // getUserDetails(14)
  // setUserDetails(getUserDetails(user))
  // console.log(UserDetails);


  const [value, setValue] = useState('')
  const [results, setResults] = useState([]);

  // const onSearch = (searchTerm) => {
  //   setResults([])
  //   console.log('What you searched for: ' + searchTerm);
  //   setResults(searchTerm)
  //   console.log();
  // }


  function onChange(e) {
    setValue(e.target.value)
  } 


  let nav = user ? (
    // IF SIGNED IN
    <div className="navBar-logged-in">
      <NavLink
        to=""
        className="navBar-logout"
        onClick={handleLogout}
        style={{ color: "#07393C" }}
      >
        Log out
      </NavLink>

      <Link
        to={`/user/${user}`}
        className="user-name"
        style={{ color: "#07393C" }}
      >
        {user}
      </Link>

    </div>
  ) : (
    //IF SIGNED OUT
    <div>
      <NavLink
        to="/login"
        className="navBar-login"
        style={{ color: "#07393C" }}
      >
        Log in
      </NavLink>

      <NavLink
        to="/signup"
        className="navBar-signup"
        // style={{ color: "#07393C" }}
      >
        Sign up
      </NavLink>
    </div>
  );



  return (
    <div className="nav">
      <div className="navBar">

        <div className="navBar-left">
          {nav}
        </div>

        <Link to="/" style={{ color: "#07393C" }}>
          <h1 className="moviewer">Moviewer</h1>
        </Link>

          <Link to='/cart'>
            <NavLink
        to="/"
        className="cart"
      >Cart</NavLink>
          </Link>
      </div>
      
      {/* <div className="search">
        <input type='text' value={value} className="searchbar" placeholder="Search for a movie title" onSubmit={() => onSearch(value)}  onChange={onChange}></input>
        <Link to={`/results/${value}`}>  <div className="search-icon"><SearchOutlinedIcon onClick={() => onSearch(value) } /></div>  </Link>
      </div> */}
      
      {/* <form className="searchbar-label">
        <label>
          <input type='text' value={value} placeholder="Search for a movie title" onChange={onChange} className='searchbar'></input>
        </label>
        <Link to={`/results/${value}`}><input type="submit" value="Find Movie" className="search-btn" /></Link> 
      </form> */}


      <form className='search-bar-new'>
        <input type='text' value={value} placeholder="Search for a movie title" onChange={onChange}></input>
        <Link to={`/results/${value}`}><button type="submit"><img src={require('../../images/icons8-search-150.png')} alt="search" /></button></Link>
      </form>
    </div>
  );
};

export default NavBar;
