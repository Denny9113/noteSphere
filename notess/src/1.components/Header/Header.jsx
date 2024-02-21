import React from 'react'
import { Icon } from '@iconify/react';
import TooltipItem from "../SupportingComponents/Tooltip";
import Logo from './logo/Logo';

function Header() {
    return (
        <div className=' w-full z-99 top-0 border-b fixed px-4 py-1 flex justify-between 
        items-center bg-white '>
            {/* left side */}
            <div className=' flex items-center  h-14'>
                <div className='rounded-full p-1'>
                    <TooltipItem position="bottom" tooltipsText="Main menu">
                        <Icon icon="mdi:menu" color='#4a5568' width={24} />
                    </TooltipItem>
                </div>
                <div className='ml-10'>
                    {/* <Icon icon="emojione-v1:note-pad" width={49} /> */}
                    <Logo width={24}/>
                </div>
            </div>

            {/* center */}
            <div className='flex items-center rounded-full sm:rounded-full md:rounded-lg  sm:mx-0 sm:ml-48 md:mx-0 py-0 sm:py-0 md:py-1 px-0 md:px-4 sm:px-0  bg-gray-100'>
                <div className='rounded-full bg-gray-100 hoverStyle1'>
                    <div className='m-2 p-[2px] rounded-full  bg-gray-100'>
                        <Icon icon="material-symbols:search" color='#4a5568' width={23} />
                    </div>
                </div>
                <input type="text" placeholder='Search' className='w-[40rem] hidden sm:hidden md:block md:w-[10rem] lg:w-[22rem] xl:w-[35rem] 2xl:w-[40rem]  border-none outline-none bg-gray-100 placeholder:text-gray-400' />

                <div className='m-2 hidden sm:hidden md:block'>
                    <Icon icon="ic:baseline-clear" color='#4a5568' width={25} />
                </div>
            </div>

            {/* Right */}
            <div>
                <div className='flex items-center '>

                    <div className='px-2 py-2 sm:px-2 sm:py-2 rounded-full'>
                        <TooltipItem position="bottom" tooltipsText="Refresh">
                        <Icon icon="material-symbols:refresh" color='#4a5568' width={28} />
                        </TooltipItem>
                    </div>

                    <div className='px-2 py-2  rounded-full hidden sm:block '>
                        <TooltipItem position="bottom" tooltipsText="List view">
                        <Icon icon="carbon:list-boxes"  color='#4a5568' width={28} />
                        </TooltipItem>
                    </div>

                    <div className='px-2 py-2  rounded-full '>
                        <TooltipItem position="bottom" tooltipsText="Settings">
                        <Icon icon="uil:setting" color='#4a5568' width={28} />
                        </TooltipItem>
                    </div>

                    <div className=' m-1 sm:ml-10 rounded-full flex items-center justify-center h-10 w-10 bg-[#a437db]'>
                        <TooltipItem
                            position="bottom"
                            tooltipsText={
                                <div>
                                    <p className='font-semibold'>Account</p>
                                    <p>Martin Garrix</p><p>MartinG@outlook.com</p>
                                </div>
                            }
                            customClass={true}
                        >
                            <p className='font-mono text-xl text-white'>S</p>
                        </TooltipItem>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header