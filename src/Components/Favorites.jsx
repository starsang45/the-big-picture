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
    <div className="h-screen bg-sky-950">
      <NavBar />
      <div className="h-screen m-5 bg-sky-950">
        <h1 className="text-gray-50 4xl  font-bold ">Favorites</h1>
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
      </div>
    </>
  );
};
