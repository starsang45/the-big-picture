import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "/src/Components/home";
import TBP from "/src/Components/TBP";
import { Favorites } from "/src/Components/Favorites";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TBP" element={<TBP />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
