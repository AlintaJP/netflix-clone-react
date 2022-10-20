import React, { useEffect, useState } from "react";
import "./Banner.css";
import instance from "../../utils/api/axios";
import requests from "../../utils/api/requests";
import { truncate } from "../../utils/truncate";
import { imgUrl } from "../../constants/imgUrl";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };

    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('${imgUrl}${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h2 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h2>
      </div>

      <div className="banner--fade-bottom" />
    </header>
  );
};

export default Banner;
