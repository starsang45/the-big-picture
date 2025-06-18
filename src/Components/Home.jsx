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
    <div className="h-screen flex justify-center items-center bg-sky-950">
      <div className="space-y-10">
        <div className="flex-col space-y-2">
          <h1 className="font-medium text-3xl italic text-slate-100">{quote.quote}</h1>
          <h2 className="font-mono text-slate-400">{quote.author}</h2>
        </div>
        <div class="flex justify-center">
          <Link to="/TBP">
            <button className="border rounded px-4 py-2 bg-slate-300 hover:bg-slate-100 active:bg-amber-400">
              Picture of the day
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
