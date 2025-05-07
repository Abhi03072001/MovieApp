import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadtv, removetv } from "../store/Actions/tvActions";
import Loading from "./Partials/Loading";
import HorizonatalCards from "./Partials/HorizonatalCards";


const Tvdetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative w-screen min-h-screen px-[5%] py-[3%] text-white"
    >
      {/* Navigation */}
      <nav className="w-full flex items-center gap-5 text-lg mb-8">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] flex items-center gap-2"
        >
          <i className="ri-arrow-left-line text-2xl"></i> Back
        </button>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={info.detail.homepage}
          className="hover:text-[#6556CD] flex items-center gap-2"
        >
          <i className="ri-external-link-fill"></i> Official Site
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          className="hover:text-[#6556CD] flex items-center gap-2"
        >
          <i className="ri-earth-fill"></i> Wiki
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="hover:text-[#6556CD] flex items-center gap-2"
        >
          <i className="ri-imdb-fill"></i> IMDb
        </a>
      </nav>

      {/* Poster and Details */}
      <div className="flex flex-col lg:flex-row gap-8">
        <img
          className="shadow-lg rounded-lg w-full lg:w-[30%] object-cover"
          src={`http://image.tmdb.org/t/p/original${info.detail.poster_path || info.detail.backdrop_path}`}
          alt={info.detail.title || "tv Poster"}
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">
            {info.detail.title || info.detail.name || info.detail.original_name || info.detail.original_title}
            <span className="text-zinc-400 text-2xl ml-2">
              ({info.detail.first_air_date?.split("-")[0]})
            </span>
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl font-bold bg-yellow-500 text-black px-4 py-2 rounded-full">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>
            <span className="text-lg">User Score</span>
            <span className="text-lg">| {info.detail.runtime} min</span>
          </div>
          <p className="italic text-zinc-400 mb-4">{info.detail.tagline}</p>
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-lg leading-relaxed">{info.detail.overview}</p>
          <Link
            to={`${pathname}/trailer`}
            className="mt-6 inline-block bg-[#6556CD] text-white px-6 py-3 rounded-lg hover:bg-[#4a3db8] transition"
          >
            <i className="ri-play-fill text-xl"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Availability */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Availability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {info.watchproviders?.flatrate && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Available on Platforms</h3>
              <div className="flex gap-4">
                {info.watchproviders.flatrate.map((w, index) => (
                  <img
                    key={index}
                    title={w.provider_name}
                    className="w-12 h-12 rounded-md object-cover"
                    src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                    alt={w.provider_name}
                  />
                ))}
              </div>
            </div>
          )}
          {info.watchproviders?.rent && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Available for Rent</h3>
              <div className="flex gap-4">
                {info.watchproviders.rent.map((w, index) => (
                  <img
                    key={index}
                    title={w.provider_name}
                    className="w-12 h-12 rounded-md object-cover"
                    src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                    alt={w.provider_name}
                  />
                ))}
              </div>
            </div>
          )}
          {info.watchproviders?.buy && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Available to Buy</h3>
              <div className="flex gap-4">
                {info.watchproviders.buy.map((w, index) => (
                  <img
                    key={index}
                    title={w.provider_name}
                    className="w-12 h-12 rounded-md object-cover"
                    src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                    alt={w.provider_name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Seasons */}
<div className="mt-10">
  <h2 className="text-3xl font-bold mb-6">Seasons</h2>
  <HorizonatalCards
    data={info.detail.seasons?.map((season) => ({
      id: season.id,
      title: season.name,
      overview: season.overview,
      poster_path: season.poster_path
        ? `https://image.tmdb.org/t/p/original${season.poster_path}`
        : "/path/to/fallback-image.jpg", // Fallback image
      episode_count: season.episode_count,
    }))}
  />
</div>
      

      {/* Recommendations */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Recommendations & Similar</h2>
        <HorizonatalCards
          data={info.recommendations?.length > 0 ? info.recommendations : info.similar}
        />
        <Outlet />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvdetails;
