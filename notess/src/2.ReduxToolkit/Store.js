import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./Slice.jsx";

export const store = configureStore({
    reducer: {
        clickToShow: notesReducer,
    },
})