import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Loading from './Components/Partials/Loading'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import Movie from './Components/Movie'
import TvShows from './Components/TvShows'
import People from './Components/People'
import Moviedetails from './Components/Moviedetails'
import Tvdetails from './Components/Tvdetails'
import Persondetails from './Components/Persondetails'
import Trailer from './Components/Partials/Trailer'
import Notfound from './Components/Partials/notfound'

const App = () => {
  return (
    <div className='h-full w-full bg-[#1F1E24] flex overflow-auto'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/tvShows' element={<TvShows />} />
        <Route path='/person' element={<People />} />
        <Route path='/person/details/:id' element={<Persondetails />} />


        <Route path='/tv/details/:id' element={<Tvdetails />}>
        <Route path='/tv/details/:id/trailer' element={<Trailer />} />
        </Route>

        
        <Route path='/movie/details/:id' element={<Moviedetails />}>
        <Route path='/movie/details/:id/trailer' element={<Trailer />} />
        </Route>

        
        <Route path="*" element={<Notfound />} />
        
      </Routes>
    </div>
  )
}

export default App