
//Signup component
//This component renders the signup page for the app
//Users can create an account by entering a username and password
//The form sends a POST request to the server, and upon success, redirect to home page.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    const navigate = useNavigate();

    //set state to store form input
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //send a POST request to the backend with username and password
    //if successful, navigate to home. otherwise, display an error.
    const handleSignup = async() =>{
        try{
            const response = await fetch('/api/signup', { //POST to backend (/api/signup)
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) throw new Error('signup failed');

            navigate('/home');
        }catch(err) {
            setError('Almost there! Just give it one more try.')
            //navigate('/home'); demo test
        }
    };
    const redirectSignin = () =>{
        navigate('/');
    };
    return (
        <div>
            {/* Title */}
            <header>NASA Picture of Day</header>

            {/* Renders signup form
                two inputs: usename and password
                error message if sign fails - conditional rendering
                two buttons: sign up and return to signin
            */}

            <div id = 'input-and-button-container'>
                <input
                    type = 'text'
                    id = 'new-username'
                    placeholder = 'create username'
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                />

                <input
                    type = 'password'
                    id = 'new-password'
                    placeholder = 'create password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                />

                {error &&
                    <p style={{color: 'red'}}>{error}</p>
                }

                <div id = 'button-container'>
                    <button id = 'signup' onClick={handleSignup}>Sign Up</button>
                    <button id = 'back-to-signin' onClick={redirectSignin}>Back to Sign In</button>
                </div>
            </div>      
        </div>
    )
  
};

export default Signup;

