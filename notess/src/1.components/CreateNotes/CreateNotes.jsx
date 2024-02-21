import React, { forwardRef, useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBoth,
  chooseColor,
  deleteLabels,
  addImg,
  deleteImg,
} from "../../2.ReduxToolkit/Slice";
import { nanoid } from "@reduxjs/toolkit";
import TooltipItem from "../SupportingComponents/Tooltip";
import BackgroundOptions from "../SupportingComponents/BackgroundOptions";
import { img1, img2, img3, img4 } from "../../img/img";
import MoreOption from "../SupportingComponents/MoreOption";
import AdjusInput from "../SupportingComponents/AdjusInput";
import AddImg from "../SupportingComponents/AddImg";

function CreateNotes(props) {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.clickToShow.color);
  const labelArry = useSelector((state) => state.clickToShow.label);
  const value = useSelector((state) => state.clickToShow.clickValue);
  const Img = useSelector((state) => state.clickToShow.Img);

  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [colorValue, setColorValue] = useState("");
  const [labelValue, setLabelValue] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [hoverOnImg, setHoverOnImg] = useState(false);

  const [onMouseHover, setOnMouseHover] = useState(false);
  const inputRef = useRef();
  const MoreOptionRef = useRef();

  // For dispatching all the data and clear input fields

  const submit = () => {
    const labels = [];
    labelArry.map((each) => {
      if (each.isChecked) {
        labels.push(each);
      }
    });

    dispatch(
      updateBoth({
        id: nanoid(),
        Title: input1Value,
        Text: input2Value,
        color: color,
        label: labels,
        Img: Img,
      })
    );

    dispatch(chooseColor("white"));
    setColorValue("white");
    setLabelValue([]);
    dispatch(addImg(""));
    if (input1Value) setInput1Value("");
    if (input2Value) setInput2Value("");
    setIsEditing(false);
    console.log("the Imgs is: ", Img);
  };

  useEffect(() => {
    console.log("the value is: ", value);
  }, [Img]);

  // funcnality of click to show title and text input field (line: 30-43)
  const handleInputClick = () => {
    setIsEditing(true);
  };

  const handleOutsideClick = (event) => {
    // event.stopPropagation();
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsEditing(false);
      //     setBgVisible(false);
      //     setMoreOption(false)
      //     // setColorValue('white')
      //     // dispatch(chooseColor('white'))
    }
    if (event.target && !event.target.closest("#MoreOptionForCreateNote")) {
      setMoreOption(false);
    }
    if (event.target && !event.target.closest("#BgOptionForCreateNote")) {
      setBgVisible(false);
    }
  };

  const handleClickForAllOption = (index) => {
    setBgVisible(false);
    setMoreOption(false);

    if (index == 1) {
      setBgVisible(true);
    }
    if (index == 2) {
      setMoreOption(true);
    }
  };
  const mouseOverfn = (condition, id) => {
    if (condition) {
      setOnMouseHover(true);
      document.getElementById(`${id}closeBtn`).style.opacity = "100%";
      document.getElementById(`${id}text`).style.opacity = "0%";
    } else if (!condition) {
      setOnMouseHover(false);
      document.getElementById(`${id}closeBtn`).style.opacity = "0%";
      document.getElementById(`${id}text`).style.opacity = "100%";
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      handleOutsideClick(event);
    });

    return document.removeEventListener("mousedown", (event) => {
      handleOutsideClick(event);
    });
  }, []);

  useEffect(() => {
    setLabelValue(labelArry);
    console.log("lableValue: ", labelValue);
  }, [labelArry, labelValue]);

  return (
    <div id="CreateNotes" className="w-full ">
      {/* bg-[${colorValue}] */}
      <div
        className={`border-t bg-[${color}] bg-cover bg-center  rounded-xl shadow-md justify-center transition-all
                    sm:w-[75%] sm:m-auto
                    lg:w-[45%] lg:m-auto
                    w-[calc(100%-5rem)] ml-[2.8rem] mr-4
                    px-4 py-3
                `}
      >
        {/* image goas hear */}
        {Img.length > 0 && isEditing && (
          <div
            className={`
                        grid grid-cols-1 gap-1 h-auto bg-transparent 
                        ${Img.length > 0 ? "mb-3" : null}
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4`}
            style={{
              gridAutoRows: "minmax(100px, auto)",
              gridTemplateColumns: `repeat(auto-fill, minmax(${
                Img.length === 2 ? "275px" : "200px"
              }, 1fr))`,
            }}
          >
            {Img.filter((i) => i.id !== "first").map((each, index) => {
              if (each.id !== 1) {
                return (
                  <div key={index} className="overflow-hidden">
                    <button
                      onClick={() => dispatch(deleteImg(each.id))}
                      className="bg-black text-white absolute p-1 rounded bg-opacity-30 hover:bg-opacity-100 transition-all"
                    >
                      <Icon icon="ic:baseline-delete" />
                    </button>
                    <img
                      src={`${each.img}`}
                      className="rounded w-full h-auto"
                    />
                  </div>
                );
              }
            })}
          </div>
        )}
        <div className={``}>
          {isEditing ? (
            <div ref={inputRef}>
              {/* Title is hear */}
              <div className={``}>
                <input
                  type="text"
                  id="input1"
                  placeholder="Title"
                  className={` bg-transparent transition-all font-semibold overflow-auto placeholder:text-gray-700 outline-none w-full`}
                  value={input1Value}
                  onChange={(e) => setInput1Value(e.target.value)}
                />
              </div>

              {/* Body text is hear */}
              <div>
                <div className={``}>
                  {/* <input
                    type="text"
                    id='input2'
                    value={input2Value}
                    onChange={e => setInput2Value(e.target.value)}
                    placeholder='Take a note...'
                    className={`my-4 font-sans overflow-auto placeholder:text-gray-600 outline-none w-full bg-transparent transition-all`}
                /> */}
                  <AdjusInput
                    value={input2Value}
                    onChangeValue={setInput2Value}
                    classname={`my-4 font-sans overflow-auto placeholder:text-gray-600 outline-none w-full bg-transparent transition-all`}
                  />
                </div>
                {/* labels goes hear */}
                <div>
                  {labelValue.map((each) => {
                    if (each && each.isChecked) {
                      return (
                        <button
                          key={each.id}
                          className="transition-all text-sm text-black/70 font-bold m-1 px-3  rounded-full bg-black/15 
                                                    relative"
                          value={each.name}
                          onMouseEnter={() => mouseOverfn(true, `${each.id}`)}
                          onMouseLeave={() => mouseOverfn(false, `${each.id}`)}
                          onClick={() =>
                            dispatch(
                              deleteLabels({ id: each.id, for: "createNote" })
                            )
                          }
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
                              className={`transition-all opacity-0 absolute  right-0  p-1 mr-0 
                                bg-transparent  w-full text-center rounded-full`}
                            >
                              &#x2715;
                            </div>
                          </div>
                        </button>
                      );
                    }
                  })}
                </div>
                {/* All the icons are hear */}
                <div
                  className={`bg-white  border-gray-400 flex justify-center items-center rounded-lg mt-4 px-2 pt-1`}
                >
                  <div className="mr-7    ">
                    <TooltipItem position="bottom" tooltipsText="Remind me">
                      <Icon icon="bx:bell-plus" color="#4a5568" height={18} />
                    </TooltipItem>
                  </div>

                  <div
                    onClick={() => handleClickForAllOption(1)}
                    className="mr-7 relative"
                  >
                    {/* background options */}
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
                    {bgVisible ? (
                      <div id="BgOptionForCreateNote">
                        <BackgroundOptions />
                      </div>
                    ) : null}
                  </div>

                  <div className="mr-7 relative">
                    <TooltipItem position="bottom" tooltipsText="Add image">
                      <label className="" htmlFor="addImg">
                        <Icon
                          icon="fluent:image-24-regular"
                          color="#4a5568"
                          height={18}
                        />
                      </label>
                      <AddImg for1={"createNote"} noteID="" />
                    </TooltipItem>
                  </div>

                  <div className="mr-7">
                    <TooltipItem position="bottom" tooltipsText="Archive">
                      <Icon icon="bi:archive" color="#4a5568" height={18} />
                    </TooltipItem>
                  </div>

                  <div
                    className="mr-7"
                    onClick={() => handleClickForAllOption(2)}
                  >
                    <TooltipItem position="bottom" tooltipsText="More">
                      <Icon
                        icon="icon-park-outline:more-four"
                        color="#4a5568"
                        height={18}
                      />
                    </TooltipItem>
                    {moreOption ? (
                      <div id="MoreOptionForCreateNote">
                        <MoreOption for1={"createNote"} noteID={null} />
                      </div>
                    ) : null}
                  </div>

                  <div className=" w-[100%] flex  pb-1 justify-end">
                    <button
                      onClick={() => submit()}
                      className={`bg-transparent font-semibold hover:bg-gray-100 rounded-md text-[#4a5568] px-2 transition-all`}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div onClick={handleInputClick}>
              <input
                ref={inputRef}
                type="text"
                id="input1"
                placeholder="Title"
                className={`bg-transparent transition-all font-semibold overflow-auto placeholder:text-gray-700 outline-none w-full`}
                value={input1Value}
                onChange={(e) => setInput1Value(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateNotes;
