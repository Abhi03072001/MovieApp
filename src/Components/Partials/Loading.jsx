import React from 'react'
import loader from '/loader.gif'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='loading' src={loader} alt="Loading..." >
    </img>
    </div>
  )
}

export default Loading