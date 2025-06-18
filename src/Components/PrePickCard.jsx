export const PrePickCard = ({ pic, onPicClick }) => {
  return (
    <div className="transform transition hover:scale-110">
      <img
        className="aspect-square w-50 object-cover rounded-2xl"
        height="100px"
        src={pic.url}
        onClick={() => onPicClick(pic)}
      />
    </div>
  );
};
