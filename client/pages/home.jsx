// HomePage.jsx
// This component displays the NASA Astronomy Picture of the Day (APOD)
// by fetching only the title and image. Below that, we include
// hand-written educational content tailored for students.
// adding page navigator button that routes to sign up and favorite

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//declare variable assigning loading image
const loadingImg =
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXU4bHgxOHp3aGljcW9za2Jna3B4eWN5cnFwZmkzcTJ6NWh6Y2Y2cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QxjYIG40lpjkEDbARF/giphy.gif';

const Home = () => {
  //inirlaize navigate function
  const navigate = useNavigate();
  // State to store the NASA data (title, image)
  const [nasa, setNASA] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [imgArr, setImgArr] = useState([]);
  const [currentPic, setCurrentPic] = useState(null);

  //make fetch call to find out 1) how many images we have in favorites, 2) data associated with each image

  // useEffect hook runs only once after component mounts
  // Fetches NASA data title and image
  // If the backend handles the NASA API request, change the URL to our server endpoint
  useEffect(() => {
    // fetch('/api/nasa/apod')
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY') //test
      .then((res) => res.json())
      .then((data) => {
        setCurrentPic(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      });
  }, []);

  //need to make a fetch post request to the db to save it for later use if favorited

  const handleFavorite = () => {
    fetch('/api/postFavorite', {
      method: 'POST',
      body: JSON.stringify(currentPic),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    }).then((response) => {
      if (response.ok) {
        throw new Error('Http error! status:', response.status);
      }
      setImgArr([
        <img
          src={currentPic.hdurl}
          onClick={handleImgSwap(currentPic)}
          key={currentPic.url}
          style={{
            minWidth: '20vw',
            width: '30vw',
            height: 'auto',
            borderRadius: '10px',
            margin: '10px',
            cursor: 'pointer',
            boxShadow: ' 0 4px 8px rgb(0,0,0,0.2)', //xoffset, yoffset, blur-radius, grey
          }}
        />,
        ...imgArr,
      ]);
      console.log(imgArr);
      return response.json();
    });
  };

  //assuming the fetch gets back an array of objects
  for (let i = 0; i < favorites.length; i++) {
    //will populate the dom so we can see each individual image
    const img = favorites[i];
    setImgArr((el) => [
      ...el,
      <img
        src={img.hdurl}
        onClick={handleImgSwap(img)}
        key={img.url}
        style={{
          width: '200px',
          height: 'auto',
          borderRadius: '10px',
          margin: '10px',
          cursor: 'pointer',
          boxShadow: ' 0 4px 8px rgb(0,0,0,0.2)', //xoffset, yoffset, blur-radius, grey
        }}
      />,
    ]);
  }

  const handleImgSwap = (imageData) => {
    // needs to be able to change the different dom elements associated with their respective parts, so everything will be able to be interchangable
    setCurrentPic(imageData);
  };

  // Show a custom loading image while data is being fetched(loading) => conditional rendering
  if (!currentPic) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <img
          src={loadingImg}
          alt='Loading NASA image...'
          style={{ width: '200px', height: '200px' }}
        />
        <p style={{ marginTop: '1rem' }}>Downloading the universe...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Navigation Buttons: login, favorites */}
      <div
        style={{
          display: 'flex', //align buttons horizontly
          justifyContent: 'flex-end',
          padding: '1rem',
          backgroundColor: '#f0f4ff',
          borderBottom: '1px solid #ccc', //botton border separate from content
        }}
      >
        <button
          onClick={() => navigate('/')} //when clicked navigate to login page '/'
          style={{
            padding: '0.5rem 1rem',
            marginLeft: '0.5rem',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#0b3d91', // NASA blue
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Login
        </button>

        <button
          onClick={handleFavorite} //when clicked navigate to favorite page
          style={{
            padding: '0.5rem 1rem',
            marginLeft: '0.5rem',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#0b3d91', // NASA blue
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Favorite
        </button>
      </div>
      {/* Section 1: NASA Image and Title */}
      <div style={{ padding: '1rem' }}>
        <h1>{currentPic.title}</h1>
        {currentPic.media_type === 'image' && (
          <img
            src={currentPic.hdurl}
            alt={currentPic.title}
            style={{ maxWidth: '100%', borderRadius: '10px' }}
          />
        )}
      </div>

      {/* Section 2: Manually written educational content */}
      <div style={{ padding: '1rem', marginTop: '2rem' }}>
        <h2>Explanation</h2>
        {/* These need to be stored in variables so we can keep them in the db for later use ex: favorite img description */}
        {currentPic.explanation}
        <h2>Historical Facts</h2>
        <p>
          The center of the Milky Way has fascinated astronomers for centuries.
          Using infrared telescopes, scientists were able to look through the
          thick dust and uncover a supermassive black hole—Sagittarius A*.
        </p>

        <h2>Related Science</h2>
        <p>
          This image offers a glimpse into astrophysics: star formation,
          gravitational forces, and interstellar dust clouds. It also connects
          to studies in cosmology and radio astronomy.
        </p>
      </div>
      <section id='favorites'>{imgArr}</section>
    </div>
  );
  {
    /*Favorites */
  }
};

export default Home;
