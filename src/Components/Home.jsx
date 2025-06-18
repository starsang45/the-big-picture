import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    fetch("/api/quote")
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.data.length);
        setQuote(data.data[randomIndex]);
      });
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-[url(src/Assets/Background_Sky.jpg)]">
      <div className="space-y-10">
        <div className="flex-col space-y-2">
          <h1 className="font-medium text-3xl italic text-slate-100">{quote.quote}</h1>
          <h2 className="font-mono text-slate-400">{quote.author}</h2>
        </div>
        <div className="flex justify-center">
          <Link to="/TBP">
            <button className="border rounded px-4 py-2 bg-slate-400 hover:bg-slate-200 active:bg-slate-100">
              Picture of the day
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
