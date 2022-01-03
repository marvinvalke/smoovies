import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import SearchBar from "./SearchBar";

function Movies() {
  const [movies, setMovies] = useState(null);
  const [moviesCopy, setMoviesCopy] = useState(null);
  const [randomMovies, setRandomMovies] = useState(null);
  const [rangeValue, setRangeValue] = useState(20);

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        "https://imdb-api.com/en/API/Top250Movies/k_605jmszs"
      );
      response.data.items.length = rangeValue;
      setMoviesCopy(response.data.items);
      setMovies(response.data.items);
    }
    getData();
  }, [rangeValue]);

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

  //---------------------------- RANGE SELECTOR ---------------------------------------
  function handleRange(event) {
    event.preventDefault();
    let newRangeValue = event.target.value;
    setRangeValue(newRangeValue);
  }

  return (
    <div className="movies">
      <SearchBar btnSearch={handleSearch} />

      {randomMovies ? (
        <>
          <div className="sort-container">
            <div className="range-selector">
              <p>1</p>
              <input
                type="range"
                min="1"
                max="250"
                value={rangeValue}
                onChange={handleRange}
              />
              <p>{rangeValue}</p>
            </div>
            <div className="btn-container">
              <button onClick={handleRankSorting}>Sort by ranking</button>
              <button className="go-back" onClick={handleGoBack}>
                Go Back to full list
              </button>
              <button onClick={handleTitleSorting}>Sort by title</button>
            </div>
          </div>
          <div className="random">
            <li className="card ">
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
          </div>
        </>
      ) : (
        <>
          <div className="sort-container">
            <div className="range-selector">
              <p>1</p>
              <input
                type="range"
                min="1"
                max="250"
                value={rangeValue}
                onChange={handleRange}
              />
              <p>{rangeValue}</p>
            </div>
            <div className="btn-container">
              <button onClick={handleRankSorting}>Sort by ranking</button>
              <button onClick={handleRandomMovie}>Random movie</button>
              <button onClick={handleTitleSorting}>Sort by title</button>
            </div>
          </div>
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
