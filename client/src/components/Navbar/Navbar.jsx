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
        style={{ color: "#BCBCBC" }}
      >
        Log out
      </NavLink>

      <Link
        to={`/profile/${user._id}`}
        className="user-name"
        style={{ color: "#BCBCBC" }}
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
        style={{ color: "gold" }}
      >
        Log in
      </NavLink>

      <NavLink
        to="/signup"
        className="navBar-signup"
        style={{ color: "gold" }}
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

        <Link to="/" style={{ color: "gold" }}>
          <h1 className="moviewer">Moviewer</h1>
        </Link>

          <Link to='/cart'>
            <h2 className="create-blog">Cart</h2>
          </Link>
      </div>
      <div className="search">
        <input type='text' value={value} className="searchbar" placeholder="Search for a movie title" onSubmit={() => onSearch(value)}  onChange={onChange}></input>
        <Link to={`/results/${value}`}><div className="search-icon"><SearchOutlinedIcon onClick={() => onSearch(value) } /></div></Link>
      </div>
    </>
  );
};

export default NavBar;
