//import react from "react"// dont need it it gets pass down
import {Link} from 'react-router-dom'

const Home = ()=>{

//fetch for the qoutes 
const quotes = ['one small step for man.']
const author = 'name'



    return (
<div>
    <h2>{quotes}</h2>
    <h3>{author}</h3>
    <Link to='/Tbp'><button>the big picture</button></Link>
    
</div>

    )
}
export default Home