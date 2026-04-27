import React, { useEffect, useState } from 'react';
import Dropdown from './Partials/Dropdown';
import SideNav from './Partials/SideNav';
import TopNav from './Partials/TopNav';
import { useNavigate } from 'react-router-dom';
import axios from '../Utils/Axios';
import Cards from './Partials/Cards';
import Loading from './Partials/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [showSideNav, setShowSideNav] = useState(false);
  document.title = "MovieApp | People";

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setpeople((prev) => [...prev, ...data.results]);
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
    setpeople([]);
    sethasMore(true);
    GetPeople();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <>
      <SideNav show={showSideNav} setShow={setShowSideNav} />
      <div className="p-6 w-full lg:w-[80%] min-h-screen bg-zinc-900 text-white">
        {/* Header */}
        <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-zinc-300 flex items-center gap-3">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
            ></i>
            People
          </h1>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <TopNav setShowSideNav={setShowSideNav} />
            <Dropdown
              title="Category"
              options={["popular"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
        </div>

        {/* People Cards */}
        <InfiniteScroll
          dataLength={people.length}
          next={GetPeople}
          hasMore={hasMore}
          loader={
            <div className="text-center text-lg">
              <Loading />
            </div>
          }
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {people.map((person) => (
            <div
              key={person.id}
              className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-white truncate">{person.name}</h2>
                <p className="text-sm text-zinc-400 mt-2 truncate">
                  Known for: {person.known_for_department || "N/A"}
                </p>
                <button
                  onClick={() => navigate(`/person/details/${person.id}`)}
                  className="mt-4 bg-[#6556CD] text-white px-4 py-2 rounded-lg hover:bg-[#4a3db8] transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default People;