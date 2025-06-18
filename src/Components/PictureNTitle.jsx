export const PictureNTitle = ({picOfDay, getStar}) => {


// const handleClick =()=>{
//   getStar(picOfDay)
  
// }
//fetch req for image of the day 
  //fetch req to a list imge multiple  image image of the day to map
  return (
    <div>
      <img height='200px' src={picOfDay.url} alt='Nasa picture of the day'
      />
      <div>
        <h2>{picOfDay.title}</h2>
        <p>{picOfDay.explanation}</p>
        <button onClick={()=>{getStar(picOfDay)}}>star</button>
      </div>
    </div>
  );
};
export default PictureNTitle;


//component for center of tbp page
//on click add the callback