export const PictureNTitle = ({ picOfDay, getStar }) => {
  const handleClick = () => {
    const Favs = JSON.parse(localStorage.getItem("Favorites"));
    if (!localStorage.getItem("Favorites")) {
      localStorage.setItem("Favorites", JSON.stringify([picOfDay]));
    } else {
      localStorage.setItem("Favorites", JSON.stringify([...Favs, picOfDay]));
    }
  };

  return (
    <div className="flex gap-5">
      <img className="aspect-square max-w-150 object-cover rounded-2xl" src={picOfDay.url} alt="Nasa picture of the day" />
      <div className="border  border-slate-400 rounded-2xl p-5 bg-sky-900">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">{picOfDay.title}</h1>
          <h4>{picOfDay.date}</h4>
        </div>
        <p>{picOfDay.explanation}</p>
        <img
          src="src/Assets/Star_Small.png"
          className="w-10 transform transition hover:scale-110"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
export default PictureNTitle;
