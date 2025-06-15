import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from '../pages/signin'; //importing from signin page
import Signup from '../pages/signup'; //importing from signup page
import Home from '../pages/home'; //importing from home page
import Favs from '../pages/favorite'

// import '../styles/styles.css' // theoretical css styles that can be added in when base project is complete

const App = () => {
  return (
    <BrowserRouter> {/* allows us to traverse the different pages while still staying in our app without having to make calls to the backend */}
      <Routes> {/* this defines the different pages we are going to be visiting without interrupting the code around it */}
        <Route path='/' element={<Signin />} /> {/* signin page nav */}
        <Route path='/signup' element={<Signup />} /> signup page nav
        <Route path='/home' element={<Home />} /> {/* home page nav */}
        <Route path='/favorites' element={<Favs/>}/> {/* favorites page nav */} 
      </Routes>
    </BrowserRouter>
  );
};

export default App;