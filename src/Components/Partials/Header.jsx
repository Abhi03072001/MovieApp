import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original${
          data?.backdrop_path || data?.profile_path
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-6 md:p-10 text-white"
    >
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold max-w-full md:max-w-[70%] mb-4 break-words">
        {data?.title || data?.name || data?.original_name || data?.original_title || 'No Title Available'}
      </h1>

      {/* Overview */}
      <p className="w-full md:w-[70%] text-sm md:text-base leading-relaxed mb-4">
        {data?.overview?.slice(0, 200) || 'No description available'}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400 hover:underline">
          more
        </Link>
      </p>

      {/* Metadata */}
      <p className="flex items-center text-sm md:text-base mb-4">
        <i className="text-yellow-500 ri-megaphone-fill mr-2"></i>
        {data?.release_date || 'No information'}
        <i className="ml-5 text-yellow-500 ri-album-fill mr-2"></i>
        {data?.media_type?.toUpperCase() || 'Unknown'}
      </p>

      {/* Watch Trailer Button */}
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="mt-4 bg-[#6656CD] px-6 py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-[#4a3db8] transition"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;