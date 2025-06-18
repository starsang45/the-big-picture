import { NavBar } from "./NavBar";
import { FavCard } from "./FavCard";

export const Favorites = ({}) => {
  const Favs = JSON.parse(localStorage.getItem("Favorites"));

  return (
    <>
      <NavBar />
      <div className="m-5">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <div className="flex gap-2  ">
          {Favs.map((el, index) => {
            return <FavCard key={index} title={el.title} url={el.url} explanation={el.explanation} date={el.date} />;
          })}
        </div>
      </div>
    </>
  );
};
