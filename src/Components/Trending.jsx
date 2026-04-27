import React, { useEffect, useState } from 'react';
import Dropdown from './Partials/Dropdown';
import SideNav from './Partials/SideNav';
import TopNav from './Partials/TopNav';
import { useNavigate } from 'react-router-dom';
import axios from '../Utils/Axios';
import Cards from './Partials/Cards';
import Loading from './Partials/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [showSideNav, setShowSideNav] = useState(false);
  document.title = "MovieApp | Trending";

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
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
    settrending([]);
    sethasMore(true);
    GetTrending();
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="flex">
      <SideNav show={showSideNav} setShow={setShowSideNav} />
      <div className="p-6 w-full lg:w-[80%] min-h-screen bg-zinc-900 text-white lg:ml-[20%]">
        {/* Header */}
        <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-zinc-300 flex items-center gap-3">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
            ></i>
            Trending
          </h1>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <TopNav setShowSideNav={setShowSideNav} />
            <Dropdown
              title="Category"
              options={["movie", "tv", "all"]}
              func={(e) => setcategory(e.target.value)}
            />
            <Dropdown
              title="Duration"
              options={["week", "day"]}
              func={(e) => setduration(e.target.value)}
            />
          </div>
        </div>

        {/* Trending Cards */}
        <InfiniteScroll
          dataLength={trending.length}
          next={GetTrending}
          hasMore={hasMore}
          loader={
            <div className="text-center text-lg">
              <Loading />
            </div>
          }
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {trending.map((item) => (
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
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;