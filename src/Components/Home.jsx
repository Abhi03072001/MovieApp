import React, { useEffect, useState } from 'react'
import SideNav from './Partials/SideNav'
import TopNav from './Partials/TopNav';
import axios from '../Utils/Axios';
import Header from './Partials/Header';
import HorizonatalCards from './Partials/HorizonatalCards';
import Dropdown from './Partials/Dropdown';
import Loading from './Partials/Loading';

const Home = () => {
    document.title = "MovieApp | Home";

    const [wallpaper, setwallpaper] = useState(null);
    const [trending, settrending] = useState(null);
    const [category, setcategory] = useState("all");
    const [showSideNav, setShowSideNav] = useState(false);

     // Get Header Wallpaper


    const GetHeaderWallpaper = async () => {
      try {
       const { data }  = await axios.get(`/trending/all/day`)

       let randomData = data.results[(Math.random() * data.results.length).toFixed()];
       setwallpaper(randomData);
      }
       catch (error) {
         console.log("Error: ", error);
       }
     };

     const GetTrending = async () => {
      try {
       const { data }  = await axios.get(`/trending/${category}/day`)
        settrending(data.results);
      }
       catch (error) {
         console.log("Error: ", error);
       }
     };
   

     useEffect(() => {
        !wallpaper && GetHeaderWallpaper();
        GetTrending();
     }, [category]);



  return  wallpaper && trending ? (
    <>
    <SideNav show={showSideNav} setShow={setShowSideNav} />
    <div className='w-full lg:w-[80%] h-full overflow-auto overflow-x-hidden'>
      <TopNav setShowSideNav={setShowSideNav} />
      <Header data={wallpaper} />
      <div className="mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-400 mb-4 sm:mb-0">Trending</h1>
        <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e)=>{setcategory(e.target.value)}} />
      </div> 
      <HorizonatalCards data={trending} /> 
    </div>
    </>
  ) : <Loading />;
}

export default Home