import "./App.css";
import Home from "./components/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";




function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="*" element = {<NotFound />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/tvshows" element={<TvShows />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
