import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className="w-[20%] min-h-screen border-r-2 border-zinc-200 p-10 bg-zinc-900">
      <h1 className="text-2xl text-white font-bold mb-8">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>Movie App</span>
      </h1>

      <nav className="text-zinc-400 flex flex-col gap-4">
        <h1 className="text-white font-semibold text-xl mb-4">New Feed</h1>
        <Link
          to="/trending"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
        >
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link
          to="/popular"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
        >
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link
          to="/movie"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
        >
          <i className="ri-movie-2-fill"></i> Movies
        </Link>
        <Link
          to="/tvShows"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
        >
          <i className="ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link
          to="/person"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
        >
          <i className="ri-account-circle-fill"></i> People
        </Link>
      </nav>

      <hr className="border-none bg-zinc-400 h-[1px] my-6" />

      <nav className="text-zinc-400 flex flex-col gap-4">
        <h1 className="text-white font-semibold text-xl mb-4">Website Information</h1>
        <Link
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
        >
          <i className="ri-information-fill"></i> About
        </Link>
        <Link
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
        >
          <i className="ri-contacts-fill"></i> Contact
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;