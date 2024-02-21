import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImg } from "../../2.ReduxToolkit/Slice";
import { nanoid } from "@reduxjs/toolkit";

function AddImg({ props, for1, noteID }) {
  const dispatch = useDispatch();
  const Img = useSelector((state) => state.clickToShow.Img);
  const idForNote = useSelector((state) => state.clickToShow.id);

  const handleImageChange = (e) => {
    const file = e.target.files[e.target.files.length - 1];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const DuplicateImg = Img.some((each) => each.img === reader.result);
        if (DuplicateImg) {
          alert("Image is already exist");
        } else {
          console.log(noteID);
          dispatch(
            addImg({
              id: nanoid(),
              img: reader.result,
              for: for1,
              noteID: noteID,
            })
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage([]);
  };

  useEffect(() => {
    console.log(noteID);
  }, ['from AddImg: ',noteID])
  

  return (
    <>
      <input
        id="addImg"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {/* <img src={image[1]} alt="" /> */}
    </>
  );
}
export default AddImg;
