import React from 'react'
import notfoundImage from '/404.gif'

const notfound = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='' src={notfoundImage} alt="" >
    </img>
    </div>
  )
}

export default notfound
