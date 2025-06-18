import { NavBar } from './NavBar';
import { FavCard } from './FavCard';

export const Favorites = ({favorites}) => {
console.log(favorites)
  
  
  return (
    <div>
      <NavBar />
      <div>
        <h2>Favorites Page</h2>

        {/* {favorites.map((el, index) => {
          console.log('test2', el);
          return (
            <FavCard
              key={index}
              title={el.title}
              favP={el.url}
              explenation={el.explenation}
            />
          );
        })} */}
      </div>
    </div>
  );
};
//export default Favorites;
