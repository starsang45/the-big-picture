import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {

    const navigate = useNavigate()
    const handleSignin = () => {
        navigate('/home')
    }

    const redirectSignup = () => {
        navigate('/signup')
    }

  return (
    <div>
        <header>Nasa Data Collector</header>
        <section id='input-and-button-container'>
            <input type='text' id='username'></input>
            <input type='text' id='password'></input>
            <section id='buttons-container'>
                <button id='signin' onClick={handleSignin}></button>
                <button id='signup' onClick={redirectSignup}></button>
            </section>
        </section>
    </div>
  )
};

export default Signin;