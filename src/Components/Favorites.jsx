import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { FavCard } from "./FavCard";
import PictureNTitle from "./PictureNTitle";

export const Favorites = ({}) => {
  const [favsList, setFavsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalPic, setModalPic] = useState({});

  function getFavs() {
    return JSON.parse(localStorage.getItem("Favorites"));
  }

  useEffect(() => {
    if (getFavs()) {
      setFavsList(getFavs());
    }
  }, []);

  function removeFav(element) {
    const favs = getFavs();
    favs.splice(element, 1);
    localStorage.setItem("Favorites", JSON.stringify(favs));
    setFavsList(favs);
  }

  function modalHandler(index) {
    setModalPic(favsList[index]);
    setModal(!modal);
  }

  return (
    <>
      <div className="h-dvh bg-[url(src/Assets/Background_Sky.jpg)] bg-cover">
        {modal && (
          <div
            className="bg-slate-900/50 backdrop-blur-md w-screen h-screen fixed z-50 flex items-center justify-center"
            onClick={() => {
              setModal(!modal);
            }}
          >
            <div className="w-[75vw] text-slate-100">
              <PictureNTitle picOfDay={modalPic} />
            </div>
          </div>
        )}
        <NavBar />
        <div className="h-fill m-5 space-y-5">
          <h1 className="text-slate-100 font-bold text-2xl">Favorites</h1>
          <div className="flex flex-wrap gap-5 ">
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
                  modalHandler={modalHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
