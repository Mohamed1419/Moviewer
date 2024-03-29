import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../utils/userService';
import useUser from '../../hooks/UseUser';
import "./SignupForm.css"

function SignupForm({ updateMessage }) {
  const navigate = useNavigate()
  const { handleSignupOrLogin } = useUser()

  const [state, setState] = React.useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
    updateMessage('');
    setState((oldState) => ({
      ...oldState,
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(state);
      // Let <App> know a user has signed up!
      handleSignupOrLogin();
      // console.log(state.user);
      navigate('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      updateMessage(err.message);
    }
  }

  
  const isFormInvalid = () => {
    return !(state.username && state.email && state.password === state.password_confirmation);
  }

  return (
    <div className='SignupPage message is-primary'>
      <header className="header-footer message-header"><h1>Sign Up</h1></header>
      <div className="form-box">
      <form className="form-horizontal" onSubmit={handleSubmit} >
        <div className="form-group">
          <div className="col-sm-12">
            <input type="text" className="form-control" placeholder="Username" value={state.username} name="username" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="email" className="form-control" placeholder="Email" value={state.email} name="email" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="password" className="form-control" placeholder="Password" value={state.password} name="password" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="password" className="form-control" placeholder="Confirm Password" value={state.password_confirmation} name="password_confirmation" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group buttons">
          {/* <div className="col-sm-12 text-center"> */}
            <button className="button is-primary" style={{textDecoration: "none"}} onSubmit={handleSubmit} disabled={isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
            <button className="button is-primary"> <Link to='/' style={{textDecoration: "none"}}>Cancel</Link></button>
          {/* </div> */}
        </div>
      </form>
      </div>
    </div>
  );
}

export default SignupForm;
