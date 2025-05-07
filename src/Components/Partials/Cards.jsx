import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ data, title }) => {
  return (
    <div className='flex flex-wrap w-[full] h-[full]'>
        {data.map((c, i)=>(
            <Link to={`/${c.media_type || title}/details/${c.id}`} className='relative w-[25vh] mr-[5%] mb-[5%]' key={i}>
                <img
                className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.3)] h-[40vh] object-cover'
                src={`http://image.tmdb.org/t/p/original${c.poster_path || c.backdrop_path ||c.profile_path}`}
                alt=''
                />
                <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>
                    {c.title || c.name || c.original_name || c.original_title}
                </h1>
                {c.vote_average && (
                  <div className='absolute font-semibold text-xl rounded-full right-[-10%] bottom-[25%] text-white flex justify-center items-center w-[10vh] h-[10vh] bg-yellow-600'>
                  {(c.vote_average * 10).toFixed()} <sup>%</sup>
                  </div>
                )}
                
            </Link>
        ))}
    </div>
  )
}

export default Cards