import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = ({ show, setShow }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 max-w-full border-r-2 border-zinc-200 p-6 bg-zinc-900 transform transition-transform duration-300 ${show ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 lg:w-[20%] lg:p-10`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span>Movie App</span>
        </h1>
        <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setShow(false)}>
          <i className="ri-close-line text-2xl"></i>
        </button>
      </div>

      <nav className="text-zinc-400 flex flex-col gap-4">
        <h1 className="text-white font-semibold text-xl mb-4">New Feed</h1>
        <Link
          to="/trending"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
          onClick={() => setShow(false)}
        >
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link
          to="/popular"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
          onClick={() => setShow(false)}
        >
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link
          to="/movie"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
          onClick={() => setShow(false)}
        >
          <i className="ri-movie-2-fill"></i> Movies
        </Link>
        <Link
          to="/tvShows"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
          onClick={() => setShow(false)}
        >
          <i className="ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link
          to="/person"
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
          onClick={() => setShow(false)}
        >
          <i className="ri-account-circle-fill"></i> People
        </Link>
      </nav>

      <hr className="border-none bg-zinc-400 h-[1px] my-6" />

      <nav className="text-zinc-400 flex flex-col gap-4">
        <h1 className="text-white font-semibold text-xl mb-4">Website Information</h1>
        <Link
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
          onClick={() => setShow(false)}
        >
          <i className="ri-information-fill"></i> About
        </Link>
        <Link
          className="p-4 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg flex items-center gap-2"
          onClick={() => setShow(false)}
        >
          <i className="ri-contacts-fill"></i> Contact
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;