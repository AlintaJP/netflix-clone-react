import React from "react";
import "./Banner.css";
import { truncate } from "../../utils/truncate";
import { imgUrl } from "../../constants/imgUrl";
import useBanner from "../../hooks/useBanner";

const Banner = () => {
  const { data: poster } = useBanner();

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('${imgUrl}${poster?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {poster?.title || poster?.name || poster?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h2 className="banner__description">
          {truncate(poster?.overview, 150)}
        </h2>
      </div>

      <div className="banner--fade-bottom" />
    </header>
  );
};

export default Banner;
