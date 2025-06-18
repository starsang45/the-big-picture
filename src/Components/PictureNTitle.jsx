export const PictureNTitle = ({ picOfDay }) => {
  const handleClick = () => {
    const Favs = JSON.parse(localStorage.getItem("Favorites"));
    if (!localStorage.getItem("Favorites")) {
      localStorage.setItem("Favorites", JSON.stringify([picOfDay]));
    } else {
      localStorage.setItem("Favorites", JSON.stringify([...Favs, picOfDay]));
    }
  };

  return (
    <div className="flex gap-5 ">
      <img
        className="border  border-slate-400 rounded-2xl aspect-square max-w-150 object-cover"
        src={picOfDay.url}
        alt="Nasa picture of the day"
      />
      <div className="border  border-slate-400 rounded-2xl p-5 bg-[#29456c99] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center ">
            <h1 className=" font-bold text-4xl  ">{picOfDay.title}</h1>
            <img
              src="src/Assets/Star_Small.png"
              className="w-10 transform transition hover:scale-110 " 
              onClick={handleClick}
            />
          </div>
          <p className="flex justifly-between leading-relaxed text-lg mt-4">{picOfDay.explanation}</p>
        </div>

        <h4 className=" text-slate-400 text-right ">{picOfDay.date}</h4>
      </div>
    </div>
  );
};
export default PictureNTitle;
