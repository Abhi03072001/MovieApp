import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noImage from "/noImage.jpg"

const HorizonatalCards = ({ data }) => {
  return (
      

      <div className="w-[100%] flex overflow-y-hidden">
        {data.length > 0 ? data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[15%] bg-zinc-900 mr-5 mb-5">
            <img
            className="w-full object-cover h-[20vh] overflow-y-auto" 
            src={d.backdrop_path || d.profile_path || d.poster_path ? `https://image.tmdb.org/t/p/original${
            d.backdrop_path || d.profile_path || d.poster_path
        }` : noImage } />
        <div className="text-white p-3 h-[45%] overflow-y-auto"> 
        <h1 className="text-xl font-semibold">
              {d?.title ||
                d?.name ||
                d?.original_name ||
                d?.original_title}
            </h1>
            <p className=" text-white">
              {d.overview?.slice(0, 20)}...
              <span className="text-blue-400">more</span>
            </p>
        </div>
          </Link>
        )) : <h1 className="text-3xl text-white font-black text-center">Nothing to show</h1>}
      </div>
    
  );
};

export default HorizonatalCards;
