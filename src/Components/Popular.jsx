import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Utils/Axios';
import TopNav from './Partials/TopNav';
import Dropdown from './Partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Partials/Cards';
import Loading from './Partials/Loading';

const Popular = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MovieApp | Popular";

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = () => {
    setpage(1);
    setpopular([]);
    sethasMore(true);
    GetPopular();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="p-6 w-screen min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-zinc-300">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>{" "}
          Popular
        </h1>

        <div className="flex items-center gap-4">
          <TopNav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      {/* Popular Cards */}
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={
          <div className="text-center text-lg">
            <Loading />
          </div>
        }
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {popular.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-white truncate">
                {item.title || item.name}
              </h2>
              <p className="text-sm text-zinc-400 mt-2 truncate">
                {item.overview || "No description available."}
              </p>
              <button
                onClick={() => navigate(`/${category}/details/${item.id}`)}
                className="mt-4 bg-[#6556CD] text-white px-4 py-2 rounded-lg hover:bg-[#4a3db8] transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;