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
      <img className="flex grow-2 max-h-200 rounded" src={picOfDay.url} alt="Nasa picture of the day" />
      <div className="border rounded p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">{picOfDay.title}</h1>
          <h4>{picOfDay.date}</h4>
        </div>
        <p>{picOfDay.explanation}</p>
        <button className="border rounded px-4 py-1" onClick={handleClick}>
          star
        </button>
      </div>
    </div>
  );
};
export default PictureNTitle;
