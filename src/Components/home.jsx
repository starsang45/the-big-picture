//import react from "react"// dont need it it gets pass down
import { useState } from 'react'
import {Link} from 'react-router-dom'

const Home = ()=>{

    const [quote, setQuote] = useState({
        quote:`That's one small step for a man, one giant leap for mankind`,
        author : 'Neil Armstrong'
    }
    )

    //later do useEffect to fectch the data
    //build async fetch aWAIT . THEN 
     //fetch for the qoutes 
const quotes = [`That's one small step for a man, one giant leap for mankind`]
const author = 'Neil Armstrong'



    return (
<div>
    <h2>{quote.quote}</h2>
    <h3>{quote.author}</h3>
    <Link to='/Tbp'><button>See picture of the day</button></Link>
    
</div>

    )
}
export default Home