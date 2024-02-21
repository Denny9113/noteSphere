import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNotes from "../CreateNotes/CreateNotes";
import {
  idForColor,
  showCard,
  toggleValue,
  deleteLabels,
  deleteImgForNote,
} from "../../2.ReduxToolkit/Slice";
import { Icon } from "@iconify/react";
import PopupCard from "../SupportingComponents/PopupCard";
import TooltipItem from "../SupportingComponents/Tooltip";
import BackgroundOptions from "../SupportingComponents/BackgroundOptions";
// import { img1 } from '../../img/img';
import MoreOption from "../SupportingComponents/MoreOption";
import { img1, img2, img3 } from "../../img/img";
import AddImg from "../SupportingComponents/AddImg";

function Notes() {
  const [cardText, setCardText] = useState("");
  const [cardData, setCardData] = useState({});
  const [cardTitle, setCardTitle] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [cardImg, setCardImg] = useState("");
  const [mouseOver, setMouseOver] = useState(false);
  const [OnMHlabel, setOnMHlabel] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);
  const [moreListVisible, setMoreListVisible] = useState(false);
  const value = useSelector((state) => state.clickToShow.clickValue);
  const toggleValue0 = useSelector((state) => state.clickToShow.toggleValue);
  const Imgs = useSelector((state) => state.clickToShow.toggleValue.Img);
  const [id, setid] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const idForNote = useSelector((state) => state.clickToShow.id);
  const refForId = useRef([]);

  const dispatch = useDispatch();

  const handleClick = (each) => {
    // console.log(each.id);
    dispatch(showCard(each.id));
    setCardText(each.Text);
    setCardTitle(each.Title);
    setCardColor(each.color);
    setCardImg(each.Img);
    // console.log(each)
    setCardData(each);
    handleTriggerClick();
  };

  const dispatchIdOnlick = () => {
    refForId &&
      refForId.current.map((every) => {
        every?.addEventListener("click", () => {
          value.map((each) => {
            // console.log(each.color)
            if (each.id == every.id) {
              console.log(
                "match :: each.id is: " +
                  each.id +
                  " | every.id is: " +
                  every.id +
                  "each.color is: " +
                  each.color
              );
              dispatch(idForColor(each.id));
            }
          });
        });
      });
  };

  const BGOptionButton = (event) => {
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();
    const x = rect.left - 100;
    const y = rect.top + 20;
    setPosition({ x, y });
    setBgVisible(true);
    dispatchIdOnlick();
  };

  const moreOptionButton = (event, id) => {
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top + 20;
    setPosition({ x, y });
    // setMoreListVisible(!moreListVisible)
    setMoreListVisible(true);
    setid(id);
    dispatchIdOnlick();
  };

  // for Popup card
  const handleTriggerClick = () => {
    dispatchIdOnlick();
    dispatch(toggleValue(true));
  };

  // Updates mouseOover state and set the opacity of an iconDiv based on conditions.
  const mouseOverfn = (condition, each) => {
    setid(each.id);

    const isVisible = bgVisible || moreListVisible;
    if (!isVisible && condition) {
      setMouseOver(true);
      document.getElementById(`${each.id}iconDiv`).style.opacity = "100%";
    }
    if (isVisible && condition) {
      setMouseOver(true);
      document.getElementById(`${each.id}iconDiv`).style.opacity = "100%";
    }
    if (isVisible && !condition) {
      setMouseOver(true);
      document.getElementById(`${each.id}iconDiv`).style.opacity = "100%";
    }
    if (!isVisible && !condition) {
      setMouseOver(false);
      document.getElementById(`${each.id}iconDiv`).style.opacity = "0%";
    }
  };

  const mouseOverfnForLabel = (condition, id) => {
    if (condition) {
      setOnMHlabel(true);
      document.getElementById(`${id}closeBtn`).style.opacity = "100%";
      document.getElementById(`${id}text`).style.opacity = "0%";
    } else if (!condition) {
      setOnMHlabel(false);
      document.getElementById(`${id}closeBtn`).style.opacity = "0%";
      document.getElementById(`${id}text`).style.opacity = "100%";
    }
  };

  const deletelabelBtn = (e, noteID, id) => {
    e.stopPropagation();
    dispatch(
      deleteLabels({
        noteID: noteID,
        id: id,
        for: "notes",
      })
    );
  };

  useEffect(() => {
    dispatch(toggleValue(false));
    dispatchIdOnlick();
  }, []);

  // Manages the visibility of <BackgroundOptions /> and <MoreOption /> components.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("#moreOptionParent")) {
        setMoreListVisible(false);
      }
      if (!event.target.closest("#BgOptionParent")) {
        setBgVisible(false);
      }
    };

    const handleOpacityChange = () => {
      const visibility = moreListVisible || bgVisible;
      const opacity = visibility ? "100%" : "0%";

      value.forEach((each) => {
        document.getElementById(`${each.id}iconDiv`).style.opacity = opacity;
      });
    };

    handleOpacityChange();

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [moreListVisible, bgVisible, value]);

  return (
    <div
      id="NoteDiv"
      className={`w-[calc(100%-4rem)] h-screen bigdiv ml-16 mt-24 `}
    >
      <CreateNotes />

      {bgVisible ? (
        <div
          id="BgOptionParent"
          style={{
            position: "absolute",
            top: position.y + "px",
            left: position.x + "px",
          }}
        >
          <BackgroundOptions />
        </div>
      ) : null}

      {moreListVisible ? (
        <div
          id="moreOptionParent"
          style={{
            position: "absolute",
            top: position.y + "px",
            left: position.x + "px",
          }}
        >
          <MoreOption for1={"note"} noteID={id} />
        </div>
      ) : null}

      <div
        className={`w-full flex justify-center mt-6 px-10  ${
          toggleValue0 && "opacity-20"
        } `}
      >
        <div
          className={`w-fit columns-1 gap-x-2 auto-cols-min
                    sm:columns-2
                    md:columns-3
                    lg:columns-4
                    xl:columns-5
                    2xl:columns-5`}
        >
          {value.map((each, index) => (
            <div
              key={`${each.id}17-1-2024:05:03`}
              id={each.id}
              ref={(el) => (refForId.current[index] = el)}
              className={``}
              onClick={() => handleClick(each)}
            >
              <div
                id={`${each.id}innerDiv`}
                onMouseEnter={() => mouseOverfn(true, each)}
                onMouseLeave={() => mouseOverfn(false, each)}
                className={`
                                ${
                                  each.color === "white" ? "border" : null
                                } bg-[${each.color}] bg-cover bg-center
                                 block  break-inside-avoid  border-gray-200 w-full 
                                 rounded-md h-fit  mx-1 p-3 mb-2 leading-tight tracking-tight transition-all  hover:shadow-md
                                 `}
              >
                {/* image goas hear */}
                <div className="pinterest-grid-container w-full mb-3">
                  {each.Img.filter((i) => i.id).map((eachO, index) => {
                    return (
                      <div key={index} className="note-grid">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              deleteImgForNote({
                                id: eachO.id,
                                noteID: each.id,
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
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mb-3  text-black text-[1.200rem]">{each.Title}</p>
                <p className="">{each.Text}</p>

                {/* labels goes hear */}
                <div className="flex flex-wrap mt-1 ">
                  {each.label.map((each1) => {
                    if (each1.isChecked) {
                      return (
                        <button
                          key={each1.id}
                          className="transition-all text-xs text-black/70 font-bold m-1 px-3   
                                                    rounded-full bg-black/15 relative"
                          value={each1.name}
                          onMouseEnter={() =>
                            mouseOverfnForLabel(true, `${each.id}+${each1.id}`)
                          }
                          onMouseLeave={() =>
                            mouseOverfnForLabel(false, `${each.id}+${each1.id}`)
                          }
                        >
                          <div className="flex">
                            <div
                              id={`${each.id}+${each1.id}text`}
                              className={`transition-all py-1 opacity-100`}
                            >
                              {each1.name}
                            </div>
                            <div
                              onClick={(e) =>
                                deletelabelBtn(e, each.id, each1.id)
                              }
                              id={`${each.id}+${each1.id}closeBtn`}
                              className={`transition-all  absolute opacity-0 right-0  p-1 mr-0 
                                                            bg-transparent w-full text-center rounded-full`}
                            >
                              &#x2715;
                            </div>
                          </div>
                        </button>
                      );
                    }
                  })}
                </div>

                {/* all the icons are hear */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  id={`${each.id}iconDiv`}
                  className={`amazingIconDiv active:border flex mt-1 items-center justify-center bg-white rounded-md px-2 pt-1 opacity-0 transition-all
                  `}
                >
                  <div className="mr-5 ">
                    <TooltipItem position="bottom" tooltipsText="Remind me">
                      <Icon icon="bx:bell-plus" color="#4a5568" height={18} />
                    </TooltipItem>
                  </div>
                  <div
                    id="sakib"
                    className="mr-5 relative"
                    onClick={(event) => BGOptionButton(event)}
                  >
                    <TooltipItem
                      position="bottom"
                      tooltipsText="Background options"
                    >
                      <Icon
                        icon="tabler:color-filter"
                        color="#4a5568"
                        height={18}
                      />
                    </TooltipItem>
                  </div>
                  <div
                    className="mr-5"
                    onClick={() => {
                      dispatchIdOnlick();
                      console.log(idForNote);
                    }}
                  >
                    <TooltipItem position="bottom" tooltipsText="Add image">
                      <label className="" htmlFor="addImg">
                        <Icon
                          icon="fluent:image-24-regular"
                          color="#4a5568"
                          height={18}
                        />
                      </label>
                      <AddImg for1={"note"} />
                    </TooltipItem>
                  </div>

                  <div className="mr-5 ">
                    <TooltipItem position="bottom" tooltipsText="Archive">
                      <Icon icon="bi:archive" color="#4a5568" height={18} />
                    </TooltipItem>
                  </div>

                  <div
                    id={`${each.id}moreOptionDiv`}
                    className="relative"
                    onClick={(event) => moreOptionButton(event, each.id)}
                  >
                    <TooltipItem position="bottom" tooltipsText="More">
                      <Icon
                        icon="icon-park-outline:more-four"
                        color="#4a5568"
                        height={18}
                      />
                    </TooltipItem>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {toggleValue0 && (
        <PopupCard
          ref={refForId}
          Title={cardTitle}
          Text={cardText}
          Color={cardColor}
          img={cardImg}
          cardData={cardData}
        />
      )}
    </div>
  );
}

export default Notes;
