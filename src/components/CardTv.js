import React from "react";

function CardTv(props) {
  const { serie } = props;

  return (
    <div>
      <li className="card">
        <img src={serie.image} alt="" />
        <div className="data-container">
          <ul>
            <li>{serie.title}</li>
            <li>Rank #{serie.rank}</li>
            <li>{serie.year}</li>
            <li>Rating: {serie.imDbRating}</li>
          </ul>
        </div>
      </li>
    </div>
  );
}

export default CardTv;
