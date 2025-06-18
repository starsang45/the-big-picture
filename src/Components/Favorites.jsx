import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { FavCard } from "./FavCard";

export const Favorites = ({}) => {
  const [favsList, setFavsList] = useState([]);

  function getFavs() {
    return JSON.parse(localStorage.getItem("Favorites"));
  }

  useEffect(() => {
    setFavsList(getFavs());
  }, []);

  function removeFav(element) {
    const favs = getFavs();
    favs.splice(element, 1);
    localStorage.setItem("Favorites", JSON.stringify(favs));
    setFavsList(favs);
  }

  return (
    <>
      <NavBar />
      <div className="m-5">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <div className="flex gap-2  ">
          {favsList.map((el, index) => {
            return (
              <FavCard
                key={index}
                index={index}
                title={el.title}
                url={el.url}
                explanation={el.explanation}
                date={el.date}
                removeFav={removeFav}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
