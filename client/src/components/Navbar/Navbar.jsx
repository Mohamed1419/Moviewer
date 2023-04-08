import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useUser from "../../hooks/UseUser";
import "./Navbar.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const NavBar = () => {
  const { handleLogout, user } = useUser();
  const [value, setValue] = useState('')
  const [results, setResults] = useState([]);

  const onSearch = (searchTerm) => {
    setResults([])
    console.log('What you searched for: ' + searchTerm);
    setResults(searchTerm)
    console.log();
  }


  function onChange(e) {
    setValue(e.target.value)
  } 
  
//  function getResults(searchTerm) {

//       console.log(results);
//   }

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
        to={`/profile/${user._id}`}
        className="user-name"
        style={{ color: "#07393C" }}
      >
        {user.name}
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
        style={{ color: "#07393C" }}
      >
        Sign up
      </NavLink>
    </div>
  );



  return (
    <>
      <div className="navBar">

        <div className="navBar-left">
          {nav}
        </div>

        <Link to="/" style={{ color: "#07393C" }}>
          <h1 className="moviewer">Moviewer</h1>
        </Link>

          <Link to='/cart'>
            <h2 className="create-blog">Cart</h2>
          </Link>
      </div>
      
      {/* <div className="search">
        <input type='text' value={value} className="searchbar" placeholder="Search for a movie title" onSubmit={() => onSearch(value)}  onChange={onChange}></input>
        <Link to={`/results/${value}`}>  <div className="search-icon"><SearchOutlinedIcon onClick={() => onSearch(value) } /></div>  </Link>
      </div> */}
      
      <form className="search">
        <label>
          <input type='text' value={value} placeholder="Search for a movie title" onChange={onChange} className='searchbar'></input>
        </label>
        {/* Here is where the search query is pushed into the params of the results page */}
        <Link to={`/results/${value}`}><input type="submit" value="Submit" /></Link> 
      </form>
    </>
  );
};

export default NavBar;
