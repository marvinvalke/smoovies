import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import CardTv from "./CardTv";

function TvShows() {
  const [series, setSeries] = useState(null);
  const [seriesCopy, setSeriesCopy] = useState(null);
  const [randomSeries, setRandomSeries] = useState(null);
  const [rangeValue, setRangeValue] = useState(20);

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        "https://imdb-api.com/en/API/Top250TVs/k_605jmszs"
      );
      response.data.items.length = rangeValue;
      setSeriesCopy(response.data.items);
      setSeries(response.data.items);
    }
    getData();
  }, [rangeValue]);

  if (!series) {
    return <p>Loading</p>;
  }

  //---------------------------- TITLE SORTING ---------------------------------------

  const handleTitleSorting = () => {
    let clone = JSON.parse(JSON.stringify(series));
    clone.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    });

    setSeriesCopy(clone);
  };

  //---------------------------- SEARCH ---------------------------------------

  const handleSearch = (event) => {
    let searchedSerie = event.target.value;
    let filteredSeries = series.filter((serie) => {
      return serie.title.toLowerCase().includes(searchedSerie.toLowerCase());
    });
    setSeriesCopy(filteredSeries);
  };

  //---------------------------- GET RANDOM TV SHOW ---------------------------------------

  function handleRandomMovie() {
    let randomSerie = seriesCopy[Math.floor(Math.random() * seriesCopy.length)];
    setRandomSeries(randomSerie);
  }

  //---------------------------- GO BACK TO MOVIES LIST ---------------------------------------
  function handleGoBack() {
    setRandomSeries(null);
  }

  //---------------------------- GO BACK TO RANKED LIST ---------------------------------------

  function handleRankSorting() {
    async function getData() {
      let response = await axios.get(
        "https://imdb-api.com/en/API/Top250TVs/k_605jmszs"
      );
      setSeriesCopy(response.data.items);
      setSeries(response.data.items);
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
      {randomSeries ? (
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
              <button className="go-back" onClick={handleGoBack}>
                Go Back to full list
              </button>
            </div>
          </div>
          <div className="random">
            <li className="card">
              <img src={randomSeries.image} alt="" />
              <div className="data-container">
                <ul>
                  <li>{randomSeries.title}</li>
                  <li>Rank #{randomSeries.rank}</li>
                  <li>{randomSeries.year}</li>
                  <li>Rating: {randomSeries.imDbRating}</li>
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
              <button onClick={handleRandomMovie}>Random Tv Show</button>
              <button onClick={handleTitleSorting}>Sort by title</button>
            </div>
          </div>
          <ul className="movies-list">
            {seriesCopy.map((elem, i) => {
              return (
                <>
                  <CardTv serie={elem} key={elem.id} />
                </>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default TvShows;
