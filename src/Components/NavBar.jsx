import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <div className="flex justify-between p-10 text-slate-100">
      <Link to="/TBP" className="w-60">
        <img src="src/Assets/TBP_wordmark.png" />
      </Link>
      <Link to="/TBP">
        {" "}
        <img />
      </Link>
      <Link to="/Favorites">
        <h2 className="text-2xl font-medium">Favorites</h2>
      </Link>
    </div>
  );
};
export default NavBar;
