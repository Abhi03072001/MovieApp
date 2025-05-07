import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Utils/Axios';
import noImage from '/noImage.jpg';

const TopNav = () => {
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
    <div className="w-full h-[14vh] flex items-center relative bg-zinc-900 px-6">
      <i className="ri-search-line text-2xl text-zinc-400"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text"
        className="w-[50%] text-zinc-200 mx-4 p-4 outline-none border-none bg-zinc-800 rounded-lg"
        placeholder="Search Anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery('')}
          className="ri-close-fill text-3xl text-zinc-400 cursor-pointer"
        ></i>
      )}

      {query.length > 0 && (
        <div className="w-[50%] bg-zinc-800 max-h-[50vh] absolute top-[100%] left-[6%] overflow-auto z-[100] rounded-lg shadow-lg">
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
              <span>{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;