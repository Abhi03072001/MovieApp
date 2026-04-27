import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Utils/Axios';
import noImage from '/noImage.jpg';

const TopNav = ({ setShowSideNav }) => {
  const [query, setquery] = useState('');
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    if (query) GetSearches();
  }, [query]);

  return (
    <div className="w-full flex flex-wrap items-center gap-3 relative bg-zinc-900 px-4 py-3 sm:px-6">
      <button
        onClick={() => setShowSideNav && setShowSideNav(prev => !prev)}
        className="lg:hidden text-zinc-400 hover:text-white flex-shrink-0"
      >
        <i className="ri-menu-line text-2xl"></i>
      </button>

      <div className="flex-1 min-w-0">
        <input
          onChange={(e) => setquery(e.target.value)}
          value={query}
          type="text"
          className="w-full text-zinc-200 p-4 outline-none border-none bg-zinc-800 rounded-lg"
          placeholder="Search Anything"
        />
      </div>

      {query.length > 0 && (
        <button
          onClick={() => setquery('')}
          className="text-zinc-400 hover:text-white flex-shrink-0"
          aria-label="Clear search"
        >
          <i className="ri-close-fill text-3xl"></i>
        </button>
      )}

      {query.length > 0 && (
        <div className="w-full sm:w-[50%] bg-zinc-800 max-h-[50vh] absolute top-full left-0 sm:left-[6%] overflow-auto z-[100] rounded-lg shadow-lg mt-2">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-white hover:bg-zinc-700 font-semibold text-zinc-400 duration-300 w-full p-4 flex items-center gap-4 border-b border-zinc-700"
            >
              <img
                className="w-12 h-12 rounded object-cover"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original${s.backdrop_path || s.profile_path}`
                    : noImage
                }
                alt={s.name || s.title}
              />
              <span className="truncate">{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;