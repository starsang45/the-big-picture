import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {createRoot} from 'react-dom/client'
//import Signin from '../Old files/client/pages/signin'; //importing from signin page
//import Signup from '../Old files/client/pages/signup'; //importing from signup page
import Home from '/src/Components/home'; //importing from home page
import Tbp from '/src/Components/Tbp'
import {Favorites} from '/src/Components/Favorites'



// import '../styles/styles.css' // theoretical css styles that can be added in when base project is complete

const App = () => {
  


  return (
    <BrowserRouter> {/* allows us to traverse the different pages while still staying in our app without having to make calls to the backend */}
      <Routes> {/* this defines the different pages we are going to be visiting without interrupting the code around it */}
        <Route path='/' element={<Home/>} /> {/* signin page nav */}
        <Route path='/Tbp' element={<Tbp />} /> signup page nav
        <Route path='/Favorites' element={<Favorites  />} /> home page nav
      </Routes>
    </BrowserRouter>
    // <div>'hello word</div>
  );
};

export default App;