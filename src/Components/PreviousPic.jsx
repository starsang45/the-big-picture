import { PrePickCard } from './PrePickCard';

export const PreviousPic = ({ prePic }) => {
  console.log(prePic[0])
  return (
    <div>
      <h2>Previous picture of the day</h2>
      <h1>need to to a map func for the previous pic</h1>
      {prePic.map((el, index)=>{
        console.log('element' ,el)
        return  <PrePickCard key={index} pic={el.url} />
      })}
    
    </div>
  );
};
