// import React, { useState, useRef, useEffect } from 'react';

// const PopupComponent = () => {
//     const [isPopupVisible, setIsPopupVisible] = useState(false);
//     const refForId = useRef();

//     const handleTriggerClick = () => {
//         setIsPopupVisible(true);
//     };

//     const handleOutsideClick = (event) => {
//         if (refForId.current && !refForId.current.contains(event.target)) {
//             setIsPopupVisible(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleOutsideClick);

//         return () => {
//             document.removeEventListener('mousedown', handleOutsideClick);
//         };
//     }, []);

//     return (
//         <div>
//             <div onClick={handleTriggerClick}>Click to Show Popup</div>
//             {isPopupVisible && (
//                 <div className="popup" ref={refForId}>
//                     <p>This is the popup content!</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PopupComponent;

export default function Test({ children, tooltipsText, position, customClass }) {
    return (
        <div className="w-fit h-fit">
            <div className="">
                <div className="group relative z-20 inline-block">
                    <button className="z-20 rounded-full">
                        {children}
                    </button>
                    <div
                        className={` ${(position === "right" &&
                            `absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100`) ||
                            (position === "top" &&
                                `absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100`) ||
                            (position === "left" &&
                                `absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100`) ||
                            (position === "bottom" &&
                                `absolute scale-[90%] left-1/2 top-full z-20 mt-3 ${customClass ? '-translate-x-[80%]' : '-translate-x-1/2'} whitespace-nowrap rounded bg-zinc-700 px-2 py-[4px] text-sm text-white opacity-0 group-hover:opacity-100`)
                            }`}
                    >
                        { /* custom class: -translate-x-[80%] left-[85%]  */}
                        <span
                            className={` ${(position === "right" &&
                                `absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black`) ||
                                (position === "top" &&
                                    `absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black`) ||
                                (position === "left" &&
                                    `absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black`) ||
                                (position === "bottom" &&
                                    `absolute ${customClass ? 'left-[85%]' : 'left-1/2'} top-[-3px] -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-zinc-700`)
                                } `}
                        ></span>
                        {tooltipsText}
                    </div>
                </div>
            </div>
        </div>
    );
};
