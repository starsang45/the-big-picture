import{Link} from 'react-router-dom'
export const NavBar = () => {
  return (
    <div className="flex justify-between m-5">
      <Link to="/TBP"><h1>📸 The Big picture</h1></Link>
      {/* <img /> */}
      <Link to='/TBP'> <img /></Link>
      <Link to='/Favorites'><h2>Favorites</h2></Link>
    </div>
  );
};
export default NavBar;
