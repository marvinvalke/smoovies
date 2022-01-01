import React from "react";

function Card(props) {
  const { movie } = props;



  return (
    <div>
      <li className="card">
        <img src={movie.image} alt="" />
        <div className="data-container">
          <ul>
            <li>{movie.title}</li>
            <li>Rank #{movie.rank}</li>
            <li>{movie.year}</li>
            <li>Rating: {movie.imDbRating}</li>
          </ul>
        </div>
      </li>
    </div>
  );
}

export default Card;
