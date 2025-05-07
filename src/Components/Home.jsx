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
    <SideNav />
    <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
      <TopNav />
      <Header data={wallpaper} />
      <div className="mb-5 flex justify-between">
        <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
        <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e)=>{setcategory(e.target.value)}} />
      </div> 
      <HorizonatalCards data={trending} /> 
    </div>
    </>
  ) : <Loading />;
}

export default Home