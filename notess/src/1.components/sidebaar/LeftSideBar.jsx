import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { Link, NavLink } from 'react-router-dom';
import { isAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


function LeftSideBar() {

  const [MouseHover, setMouseHover] = useState(false)
  const labelArry = useSelector((state) => state.clickToShow.label);

  return (
    <div
      onMouseEnter={() => { setMouseHover(true) }}
      onMouseLeave={() => { setMouseHover(false) }}
      className='flex items-start transition-all fixed z-10 hover:shadow-lg flex-col hover:w-60 overflow-hidden w-16 h-screen  pl-2 left-0 top-[4.5rem] bg-white'>

      <NavLink to='/' className={({ isActive }) => `${isActive ? "bg-black bg-opacity-15" : null}  overflow-hidden rounded-full hoverStyle1 cursor-pointer`}>
        <div className='flex p-3'>
          <Icon icon="solar:notes-minimalistic-line-duotone" color='#4a5568' width={28} />
          {MouseHover && (<p className=' text-gray-800 mx-5 transition-all'>Notes</p>)}
        </div>
      </NavLink>

      <div className=' flex overflow-hidden rounded-full p-3 hoverStyle1 cursor-pointer' >
        <Icon icon="ep:bell" color='#4a5568' width={28} />
        {MouseHover && (<p className=' text-gray-800 mx-5 transition-all'>Reminders</p>)}
      </div>

      {/* dynanamic labels*/}
      {labelArry.map((each, index) => {
        if (each && each.name) {
          return (
            <NavLink key={index} to={`label/${each.name}`} className={({ isActive }) => `${isActive ? "bg-black bg-opacity-15" : null}  overflow-hidden rounded-full hoverStyle1 cursor-pointer`}>
              <div  className='flex p-3'>
                <Icon icon="iconoir:label" color='#4a5568' width={28} />
                {MouseHover && (<p className=' text-gray-800 ml-5 mr-1 transition-all'>{each.name}</p>)}
              </div>
            </NavLink>
          )
        }
      })}

      <div className='flex rounded-full p-3 overflow-hidden hoverStyle1 cursor-pointer'>
        <Icon icon="iconoir:label" color='#4a5568' width={28} />
        {MouseHover && (<p className=' text-gray-800 ml-5 mr-1 transition-all'>Edits<span className='invisible'>_</span>labels</p>)}
      </div>

      <NavLink to='/archive' className={({ isActive }) => `${isActive ? "bg-black bg-opacity-15" : null} overflow-hidden rounded-full p-3 hoverStyle1 cursor-pointer`}>
        <div className=' flex'>
          <Icon icon="solar:archive-linear" color='#4a5568' width={28} className='' />
          {MouseHover && (<p className=' text-gray-800 mx-5 transition-all'>Archive</p>)}
        </div>
      </NavLink>

      <div className=' rounded-full p-3 flex overflow-hidden hoverStyle1 cursor-pointer'>
        <Icon icon="solar:trash-bin-2-linear" color='#4a5568' width={28} />
        {MouseHover && (<p className=' text-gray-800 mx-5 transition-all'>Bin</p>)}
      </div>

    </div>
  )
}

export default LeftSideBar