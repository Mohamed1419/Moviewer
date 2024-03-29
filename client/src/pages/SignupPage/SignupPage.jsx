import React from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css';
import userService from '../../utils/userService';
import useUser from '../../hooks/UseUser';

function SignupPage() {
  const [message, setMessage] = React.useState("")

  const updateMessage = (msg) => {
    setMessage(msg)
  }

  return (
    <div className='SignupPage'>
      <SignupForm updateMessage={updateMessage} />
      <p>{message}</p>
    </div>
  );
}

export default SignupPage;