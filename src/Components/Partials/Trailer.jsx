import React from 'react'
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Notfound from './notfound';


const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category].info.videos);
  return  (
    <div className='z-[100] bg-[rgba(0,0,0,.9)] absolute w-screen h-screen flex items-center justify-center top-0 left-0'>
        <Link
        onClick={()=> navigate(-1)}
        className='absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%]'
        ></Link>
        { ytvideo ? 
        <ReactPlayer
        controls={true}
        height={500}
        width={800}
         url={`https://www.youtube.com/watch?v=${ytvideo.key}`} />
        : <Notfound />}
        
        </div>
  ) 
}

export default Trailer