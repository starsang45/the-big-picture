export const FavCard = ({ title, url, explanation, date, removeFav, index, modalHandler }) => {
  return (
    <div className="border border-slate-400 text-slate-100 rounded-2xl w-80 h-120 p-5 bg-[#29456c99] transform transition hover:scale-110 space-y-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
      <h2 className=" 3xl grow-2">{title}</h2>
        <img
          src="src/Assets/Star_Small.png"
          className="w-10 transform transition hover:scale-110"
          onClick={() => {
            removeFav(index);
          }}
        />
      </div>
      <div className="flex gap-5">
        <img
          className="aspect-square w-fill object-cover rounded-2xl"
          src={url}
          onClick={() => {
            modalHandler(index);
          }}
        />
        {/* <p>{explanation}</p> */}
      </div>
      <h4 className="text-slate-400 text-right">{date}</h4>
    </div>
  );
};
