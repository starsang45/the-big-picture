import { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { PictureNTitle } from "./PictureNTitle";
import { PreviousPic } from "./PreviousPic";

const TBP = () => {
  const [picOfDay, setPicOfDay] = useState({});

  useEffect(() => {
    fetch("/api/apod/one")
      .then((res) => res.json())
      .then((data) => {
        setPicOfDay(data.data);
      });
  }, []);

  const [prePic, setPrePic] = useState([]);

  useEffect(() => {
    fetch("/api/apod/prev")
      .then((res) => res.json())
      .then((data) => {
        setPrePic(data.data);
      });
  }, []);

  const handlePic = (arg) => {
    setPicOfDay(arg);
  };

  return (
    <div className="h-screen  bg-[url(src/Assets/Background_Sky.jpg)] text-slate-100 ">
      <NavBar />
      <div className="h-fill flex justify-center items-center">
        <div className=" m-5 flex-col justify-around w-[75vw]">
          <PictureNTitle picOfDay={picOfDay} />
          <PreviousPic prePic={prePic} onPicClick={handlePic} />
        </div>
      </div>
    </div>
  );
};
export default TBP;
