import { PrePickCard } from "./PrePickCard";

export const PreviousPic = ({ prePic, onPicClick }) => {
  return (
    <div className="border  border-slate-400 rounded-2xl p-5 my-5">
      <h2 className="font-bold text-2xl">Previous picture of the day</h2>
      <div className="flex gap-2 w-full overflow-x-scroll p-5">
        {prePic.map((el, index) => {
          return <PrePickCard key={index} pic={el} onPicClick={onPicClick} />;
        })}
      </div>
    </div>
  );
};
