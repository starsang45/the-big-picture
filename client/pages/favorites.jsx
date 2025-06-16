import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Favs = () => {
    const [favorites, setFavorites] = useState(0)
    const [imgArr, setImgArr] = useState([]);
    const navigate = useNavigate();

    //make a fetch call to backend and set favorites state var to the number of favorites saved

    for (let i = 0; i < favorites; i++) {
        //will populate the dom so we can see each individual image 
        setImgArr(el => [...el, <img src='http\\:thefreakingpicture' onClick={handleHomeLoad}/>])
    }

    const handleHomeLoad = () => {
        navigate('/favpage')
    }
    //will return the populated dom
}