import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [quote, setQuote] = useState({
    quote: `That's one small step for a man, one giant leap for mankind`,
    author: "Neil Armstrong",
  });

  const quotes = [`That's one small step for a man, one giant leap for mankind.`];
  const author = "Neil Armstrong";

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex-col items-center">
        <h1 className="font-medium text-3xl italic">{quote.quote}</h1>
        <h2 className="font-mono">{quote.author}</h2>
        <Link to="/TBP">
          <button className="border rounded px-4 py-2">Picture of the day</button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
