import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ data, title }) => {
  return (
    <div className='flex flex-wrap w-full justify-center sm:justify-start'>
        {data.map((c, i)=>(
            <Link to={`/${c.media_type || title}/details/${c.id}`} className='relative w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%] xl:w-[15%] mr-[2%] mb-[5%]' key={i}>
                <img
                className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.3)] h-[30vh] sm:h-[35vh] md:h-[40vh] object-cover w-full'
                src={`http://image.tmdb.org/t/p/original${c.poster_path || c.backdrop_path ||c.profile_path}`}
                alt=''
                />
                <h1 className='text-lg sm:text-xl text-zinc-300 mt-3 font-semibold truncate'>
                    {c.title || c.name || c.original_name || c.original_title}
                </h1>
                {c.vote_average && (
                  <div className='absolute font-semibold text-lg sm:text-xl rounded-full right-[-5%] sm:right-[-10%] bottom-[25%] text-white flex justify-center items-center w-[8vh] sm:w-[10vh] h-[8vh] sm:h-[10vh] bg-yellow-600'>
                  {(c.vote_average * 10).toFixed()} <sup>%</sup>
                  </div>
                )}
                
            </Link>
        ))}
    </div>
  )
}

export default Cards