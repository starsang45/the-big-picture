export const FavCard = ({ title, url, explanation, date, removeFav, index }) => {
  return (
    <div>
      <div className="border border-slate-400 text-slate-100 rounded-2xl max-w-60 p-2  bg-sky-900 ">
        <h2 className=" 3xl">{title}</h2>
        <div className= "flex justify-end">
          <img src="src/Assets/Star_Small.png" className="w-10 transform transition hover:scale-110" onClick={() => {
            removeFav(index);
          }}/>

        </div>
        <div className= "flex gap-5" >
        <img className="aspect-square max-w-50 object-cover rounded-2xl" src={url} />
        {/* <p>{explanation}</p> */}
        </div>
        <h4 className= 'text-gray-50 1xl '>{date}</h4>
      </div>
    </div>
  );
};
