import { PrePickCard } from "./PrePickCard";

export const PreviousPic = ({ prePic }) => {
  return (
    <div>
      <h2 className="font-bold text-2xl">Previous picture of the day</h2>
      <div className="flex gap-2 w-full overflow-x-scroll">
        
        {/* pass function to car */}
        
        {prePic.map((el, index) => {
          return <PrePickCard key={index} pic={el} />;
        })}
      </div>
    </div>
  );
};
