import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import TooltipItem from "../SupportingComponents/Tooltip";
import BackgroundOptions from "./BackgroundOptions";
import { img1 } from "../../img/img";
import MoreOption from "./MoreOption";
import {
  chooseTitleAndText,
  deleteImgForNote,
  deleteLabels,
  toggleValue,
} from "../../2.ReduxToolkit/Slice";
import AdjusInput from "./AdjusInput";
import CreateNotes from "../CreateNotes/CreateNotes";

function PopupCard({ cardData, Title, Text, refForId, Color }) {
  const [bgOptionVisible, setBgOptionVisible] = useState(false);
  const [moreOption, setmoreOption] = useState(false);
  const [cardText, setCardText] = useState("TEST :: this is a card");
  const [cardTitle, setCardTitle] = useState("TEST :: this is a card");
  const [cardLabel, setCardLabel] = useState([]);
  const [cardImg, setCardImg] = useState([]);
  const [isNoteEditable, setIsNoteEditable] = useState(false);
  const color = useSelector((state) => state.clickToShow.color);
  const dispatch = useDispatch();
  const value = useSelector((state) => state.clickToShow.clickValue);

  const closeBtnFn = () => {
    dispatch(toggleValue(false));
    setBgOptionVisible(false);
    dispatch(
      chooseTitleAndText({
        id: cardData.id,
        Title: cardTitle,
        Text: cardText,
      })
    );
  };

  const handleClickForAllOption = (index) => {
    // setBgOptionVisible(false);
    // setmoreOption(false);

    if (index == 1) setBgOptionVisible(true);
    if (index == 2) setmoreOption(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target && !event.target.closest("#BgOptionDiv")) {
        setBgOptionVisible(false);
      }
      if (event.target && !event.target.closest("#moreOptionDiv")) {
        setmoreOption(false);
      }
    };

    document.addEventListener("mousedown", (event) => {
      handleOutsideClick(event);
    });
    return document.removeEventListener("mousedown", (event) => {
      handleOutsideClick(event);
    });
  }, []);

  const mouseOverfnForPopup = (condition, id) => {
    if (condition) {
      // setOnMHlabel(true);
      document.getElementById(`${id}closeBtn`).style.opacity = "100%";
      document.getElementById(`${id}text`).style.opacity = "0%";
    } else if (!condition) {
      // setOnMHlabel(false);
      document.getElementById(`${id}closeBtn`).style.opacity = "0%";
      document.getElementById(`${id}text`).style.opacity = "100%";
    }
  };

  useEffect(() => {
    setCardTitle(cardData.Title);
    setCardText(cardData.Text);
    setCardLabel(cardData.label);
    setCardImg(cardData.Img);
  }, [cardData]);

  return (
    <div
      ref={refForId}
      className={`
        bg-[${color}] bg-right-bottom bg-cover 
        shadow-lg border rounded-md z-999 w-[70%] sm:w-[44%] min-h-fit p-3  absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] transition-all`}
    >
      {/* images goas hear */}
      <div className="pinterest-grid-container w-full mb-3">
        {value
          ?.find((c) => c.id === cardData.id)
          ?.Img.map((eachO, index) => (
            <div key={index} className="note-grid">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    deleteImgForNote({
                      id: eachO.id,
                      noteID: cardData.id,
                    })
                  );
                }}
                className="bg-black text-white absolute p-1 rounded bg-opacity-30 hover:bg-opacity-100 transition-all text-xs"
              >
                <Icon icon="ic:baseline-delete" />
              </button>
              <div className="note-grid-item">
                <img
                  src={eachO.img}
                  className="rounded w-full h-auto"
                  alt="Note"
                />
              </div>
            </div>
          ))}
      </div>

      {/* input */}
      <div className="">
        <div className="text-xl mb-2 ">
          {/* {cardData.Title} */}
          <input
            type="text"
            placeholder="Title"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            className="w-full bg-transparent outline-none "
          />
        </div>

        <div className="text-gray-800 mb-1 overflow-y-auto relative">
          {/* {cardData.Text} */}

          <AdjusInput
            value={cardText}
            onChangeValue={setCardText}
            classname={`bg-transparent outline-none transition-all w-full`}
            showPopup={isNoteEditable}
          />
        </div>
      </div>

      {/* labels goes hear */}
      <div className="flex flex-wrap mb-8">
        {value.map((eachO) => {
          if (eachO && eachO.id === cardData.id) {
            return eachO.label.map((each) => {
              if (each.isChecked) {
                return (
                  <button
                    key={each.id}
                    className="transition-all text-xs text-black/70 font-bold m-1 px-3 rounded-full bg-black/15 relative"
                    value={""}
                    onMouseEnter={() => mouseOverfnForPopup(true, each.id)}
                    onMouseLeave={() => mouseOverfnForPopup(false, each.id)}
                  >
                    <div className="flex">
                      <div
                        id={`${each.id}text`}
                        className={`transition-all py-1 opacity-100`}
                      >
                        {each.name}
                      </div>
                      <div
                        id={`${each.id}closeBtn`}
                        onClick={() =>
                          dispatch(
                            deleteLabels({
                              noteID: cardData.id,
                              id: each.id,
                              for: "notes",
                            })
                          )
                        }
                        className={`transition-all absolute opacity-0 right-0 p-1 mr-0 bg-transparent w-full text-center rounded-full`}
                      >
                        &#x2715;
                      </div>
                    </div>
                  </button>
                );
              }
              return null;
            });
          }
          return null;
        })}
      </div>

      {/* div for icons */}
      <div
        style={{ left: "1.3%" }}
        className={`bg-white absolute bottom-0  rounded-md w-[97.5%]
            flex justify-center items-center
            py-1 my-2 
            `}
      >
        <div className=" mr-3 ml-1 sm:mr-7 sm:ml-3 ">
          <Icon icon="bx:bell-plus" color="#4a5568" height={18} />
        </div>

        <div
          className="mr-3 sm:mr-7 relative "
          onClick={() => handleClickForAllOption(1)}
        >
          <Icon icon="tabler:color-filter" color="#4a5568" height={18} />
          {bgOptionVisible ? (
            <div id="BgOptionDiv" className="absolute top-[110%] -left-[120%]">
              <BackgroundOptions />
            </div>
          ) : null}
        </div>

        <div className="mr-3 sm:mr-7">
          <Icon icon="fluent:image-24-regular" color="#4a5568" height={18} />
        </div>
        <div className="mr-3 sm:mr-7">
          <Icon icon="bi:archive" color="#4a5568" height={18} />
        </div>
        <div
          className="mr-3 sm:mr-7 relative"
          onClick={() => handleClickForAllOption(2)}
        >
          <Icon
            icon="icon-park-outline:more-four"
            color="#4a5568"
            height={18}
          />
          {moreOption ? (
            <div id="moreOptionDiv">
              <MoreOption for1={"note"} noteID={cardData.id} />
            </div>
          ) : null}
        </div>

        <div className=" flex flex-1 justify-end ">
          <button
            className={`bg-transparent font-semibold hover:bg-gray-100 rounded-md text-[#4a5568] px-2 mr-2`}
            onClick={() => closeBtnFn()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(PopupCard);
