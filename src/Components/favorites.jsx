import { NavBar } from './NavBar';
import {FavCard} from  './FavCard'

const Favorites = () => {
  return (
    <div>
        
      <NavBar />
      <div>
         <h2>Favorites</h2>
         <FavCard/>
      </div>
     
    </div>
  );
};
export default Favorites;
