import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";




function Movies() {
  const [movies, setMovies] = useState(null);
  const [moviesCopy, setMoviesCopy] = useState(null);
  const [randomMovies, setRandomMovies] = useState(null);
  const [titleRanking, setTitleRanking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        "https://imdb-api.com/en/API/Top250Movies/k_605jmszs"
      );
      setMoviesCopy(response.data.items);
      setMovies(response.data.items);
    }
    getData();
  }, []);

  if (!movies) {
    return <p>Loading</p>;
  }

  //---------------------------- TITLE SORTING ---------------------------------------

  const handleTitleSorting = () => {
    let clone = JSON.parse(JSON.stringify(movies));
    clone.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    });
    setTitleRanking(true);
    setMoviesCopy(clone);
  };

  //---------------------------- SEARCH ---------------------------------------

  const handleSearch = (event) => {
    let searchedMovie = event.target.value;
    let filteredMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchedMovie.toLowerCase());
    });
    setMoviesCopy(filteredMovies);
  };

  //---------------------------- GET RANDOM MOVIE ---------------------------------------

  function handleRandomMovie() {
    let randomMovie = moviesCopy[Math.floor(Math.random() * moviesCopy.length)];
    setRandomMovies(randomMovie);
  }

  //---------------------------- GO BACK TO MOVIES LIST ---------------------------------------
  function handleGoBack() {
    setRandomMovies(null);
  }

  //---------------------------- GO BACK TO RANKED LIST ---------------------------------------

  function handleRankSorting() {
    async function getData() {
      let response = await axios.get(
        "https://imdb-api.com/en/API/Top250Movies/k_605jmszs"
      );
      setMoviesCopy(response.data.items);
      setMovies(response.data.items);
    }
    getData();
  }

  return (
    <div className="movies">
      <SearchBar btnSearch={handleSearch} />

      <button onClick={handleRankSorting}>1 - 250</button>
      <button onClick={handleTitleSorting}>A - Z</button>

      <button onClick={handleRandomMovie}>Get a random movie</button>
      {randomMovies ? (
        <>
          <div>
            <li className="card">
              <img src={randomMovies.image} alt="" />
              <div className="data-container">
                <ul>
                  <li>{randomMovies.title}</li>
                  <li>Rank #{randomMovies.rank}</li>
                  <li>{randomMovies.year}</li>
                  <li>Rating: {randomMovies.imDbRating}</li>
                </ul>
              </div>
            </li>
            <button onClick={handleGoBack}>Go Back to full list</button>
          </div>
        </>
      ) : (
        <>
          <ul className="movies-list">
            {moviesCopy.map((elem, i) => {
              return (
                <>
                  <Card movie={elem} key={elem.id} />
                </>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default Movies;
