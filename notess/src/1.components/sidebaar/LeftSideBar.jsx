import React from 'react'
import { Icon } from '@iconify/react';

function LeftSideBar() {
  return (
    <div className='flex items-start transition-all fixed hover:shadow-lg flex-col hover:w-60 overflow-hidden w-16 h-screen  pl-2 left-0 top-14 bg-white'>

      <div className=' flex overflow-hidden rounded-full p-3  mt-4  hoverStyle1'>
      <Icon icon="solar:notes-minimalistic-line-duotone"  color='#4a5568' width={28} />
        <p className=' text-gray-800 mx-5'>Notes</p>
      </div>

      <div className=' flex overflow-hidden rounded-full p-3 hoverStyle1' >
      <Icon icon="ep:bell" color='#4a5568' width={28} />
        <p className=' text-gray-800 mx-5'>Reminders</p>

      </div>

      <div className='flex rounded-full p-3 overflow-hidden hoverStyle1'>
      <Icon icon="iconoir:label"  color='#4a5568' width={28} />
        <p className=' text-gray-800 ml-5 mr-1'>Edits<span className='invisible'>_</span>labels</p>
      </div>

      <div className=' rounded-full p-3 flex overflow-hidden hoverStyle1'>
      <Icon icon="solar:archive-linear"  color='#4a5568' width={28} />
        <p className=' text-gray-800 mx-5'>Archive</p>
      </div>

      <div className=' rounded-full p-3 flex overflow-hidden hoverStyle1'>
      <Icon icon="solar:trash-bin-2-linear" color='#4a5568' width={28} />
      <p className=' text-gray-800 mx-5'>Bin</p>
      </div>

    </div>
  )
}

export default LeftSideBar