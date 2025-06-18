export const FavCard = ({ title, url, explanation, date, removeFav, index }) => {
  return (
    <div>
      <div className="border rounded max-w-60 p-2">
        <h2 className="text-2xl">{title}</h2>
        <button
          className="border p-1"
          onClick={() => {
            removeFav(index);
          }}
        >
          un-star
        </button>
        <img className="w-50 h-50 object-contain rounded" src={url} />
        {/* <p>{explanation}</p> */}
        <h4>{date}</h4>
      </div>
    </div>
  );
};
