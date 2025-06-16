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

    const backgroundStyle = {
    backgroundImage: "url('https://www.advancedsciencenews.com/wp-content/uploads/2022/08/Carina_Webb.jpg')", // universe image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={backgroundStyle}>
        <div>
        <header>Nasa Data Collector</header>
        <section id='input-and-button-container'>
            <input type='text' id='username'></input>
            <input type='text' id='password'></input>
            <section id='buttons-container'>
                <button id='signin' onClick={handleSignin}>Sign in</button>
                <button id='signup' onClick={redirectSignup}>Sign up</button>
            </section>
        </section>
        </div>
    </div>
    
  )
};

export default Signin;