import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadperson, removeperson } from "../store/Actions/personActions";
import Loading from "./Partials/Loading";
import HorizonatalCards from "./Partials/HorizonatalCards";

const Persondetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();

  const [showFullBiography, setShowFullBiography] = useState(false);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  const toggleBiography = () => {
    setShowFullBiography(!showFullBiography);
  };

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original${info.detail.profile_path})`,
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
          href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
          className="hover:text-[#6556CD] flex items-center gap-2"
        >
          <i className="ri-imdb-fill"></i> IMDb
        </a>
      </nav>

      {/* Person Details */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start bg-zinc-900 p-6 rounded-lg shadow-lg">
        <img
          className="shadow-lg rounded-lg w-full lg:w-[30%] object-cover"
          src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
          alt={info.detail.name || "Person Poster"}
        />
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4">{info.detail.name}</h1>
          <p className="italic text-zinc-400 mb-4">{info.detail.known_for_department}</p>
          <p className="text-lg mb-4">
            <strong>Birthday:</strong> {info.detail.birthday || "N/A"}
          </p>
          <p className="text-lg mb-4">
            <strong>Place of Birth:</strong> {info.detail.place_of_birth || "N/A"}
          </p>
          <p className="text-lg mb-4">
            <strong>Popularity:</strong> {info.detail.popularity?.toFixed(1) || "N/A"}
          </p>
          <h2 className="text-2xl font-semibold mb-2">Biography</h2>
          <p className="text-lg leading-relaxed">
            {showFullBiography
              ? info.detail.biography
              : `${info.detail.biography?.split(" ").slice(0, 100).join(" ") || "No biography available for this person."}`}
            {info.detail.biography?.split(" ").length > 100 && (
              <span
                onClick={toggleBiography}
                className="text-blue-400 cursor-pointer ml-2"
              >
                {showFullBiography ? "Show Less" : "Read More"}
              </span>
            )}
          </p>

          {/* Social Media Links */}
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            {info.externalid.facebook_id && (
              <a
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="ri-facebook-fill text-3xl"></i>
              </a>
            )}
            {info.externalid.instagram_id && (
              <a
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700"
              >
                <i className="ri-instagram-fill text-3xl"></i>
              </a>
            )}
            {info.externalid.twitter_id && (
              <a
                href={`https://twitter.com/${info.externalid.twitter_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                <i className="ri-twitter-fill text-3xl"></i>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Movie Credits */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Movie Credits</h2>
        <HorizonatalCards
          data={info.movieCredits.cast.map((movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview?.slice(0, 200),
            poster_path: movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image",
            media_type: "movie",
          }))}
        />
      </div>

      {/* TV Credits */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">TV Credits</h2>
        <HorizonatalCards
          data={info.tvCredits.cast.map((tv) => ({
            id: tv.id,
            title: tv.name,
            overview: tv.overview?.slice(0, 200),
            poster_path: tv.poster_path
              ? `https://image.tmdb.org/t/p/original${tv.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image",
            media_type: "tv",
          }))}
        />
      </div>

      {/* Combined Credits */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Combined Credits</h2>
        <HorizonatalCards
          data={info.combinedCredits.cast.map((credit) => ({
            id: credit.id,
            title: credit.title || credit.name,
            overview: credit.overview?.slice(0, 200),
            poster_path: credit.poster_path
              ? `https://image.tmdb.org/t/p/original${credit.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image",
            media_type: credit.media_type,
          }))}
        />
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;