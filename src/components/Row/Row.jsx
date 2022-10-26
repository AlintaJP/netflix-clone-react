import React from "react";
import { imgUrl } from "../../constants/imgUrl";
import useRow from "../../hooks/useRow";
import "./Row.css";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const { data: movies } = useRow(fetchUrl);

  console.log(movies);

  return (
    <div className="row">
      <h3>{title}</h3>

      <div className="row__posters">
        {movies?.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__poster--large"}`}
                key={movie.id}
                src={`${imgUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Row;
