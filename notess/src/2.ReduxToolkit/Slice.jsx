import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  clickValue: [
    {
      id: 1,
      Title: "HI I'AM SAKIB",
      Text: "Welcome to my project NoteSphere. a full fledge clone of google keep ",
      color: "white",
      Img: [[]],
      label: [{ id: "1", name: "", isChecked: false }],
    },
  ],

  // supporting states
  id: {
    id: "abcd1234",
  },
  cardValue: [
    {
      Text: "card text",
    },
  ],
  color: {
    color: "white",
  },
  Img: [{ id: "first", img: "" }],

  label: [{ id: 1, name: "", isChecked: false }],
  toggleValue: [{ toggleValue: false }],
};

export const notesSlice = createSlice({
  name: "clickToShow",
  initialState,
  reducers: {
    updateBoth: (state, action) => {
      const note = action.payload;
      state.clickValue.push(note);
    },
    showCard: (state, action) => {
      state.clickValue.map((note) => {
        if (note.id == action.payload) {
          state.cardValue = note.Text;
        }
      });
    },
    chooseColor: (state, action) => {
      state.color = action.payload;
    },

    colorForNote: (state, action) => {
      state.clickValue.map((each) => {
        if (each.id == action.payload) {
          each.color = state.color;
        }
      });
    },

    idForColor: (state, action) => {
      state.id = action.payload;
    },

    chooseTitleAndText: (state, action) => {
      // payload = { id, Title, Text }
      const payload = action.payload;

      state.clickValue.map((each) => {
        if (each.id == payload.id) {
          each.Title = payload.Title;
          each.Text = payload.Text;
        }
      });
    },
    toggleValue: (state, action) => {
      const payload = action.payload;
      state.toggleValue = payload;
    },

    addLabel: (state, action) => {
      const payload = action.payload;
      state.label.push(payload);
    },

    handleCheckboxChange: (state, action) => {
      //payload has id and noteID and for
      const payload = action.payload;

      if (payload.for === "note") {
        state.clickValue.forEach((eachO) => {
          if (eachO.id === payload.noteID) {
            eachO.label = state.label;
            state.label.map((each) => {
              each && each.id === payload.id
                ? (each.isChecked = !each.isChecked)
                : each;
              eachO.label = state.label;
            });
            return;
          }
        });
      } else {
        state.label.map((each) => {
          each && each.id === payload.id
            ? (each.isChecked = !each.isChecked)
            : each;
        });
      }
    },

    addImg: (state, action) => {
      // payload hasid: id, img, for, noteID,
      const payload = action.payload;
      if (payload.for === "createNote") {
        payload ? state.Img.push(payload) : (state.Img = []);
        console.log("for CreateNotes");
      }

      if (payload.for === "note")
        state.clickValue.map((eachO) => {
          if (eachO.id === payload.noteID) {
            eachO.Img.push(payload);
            console.log("for notes");
            console.log(payload.noteID);
          }
          return;
        });
    },

    // addImgForNote: (state, action) => {
    //   // payload has noteID
    //   const payload = action.payload;
    // },

    deleteLabels: (state, action) => {
      const payload = action.payload;
      if (payload.for === "createNote") {
        state.label.forEach((each) => {
          if (each && each.id === payload.id) {
            each.isChecked = !each.isChecked;
          }
        });
      }
      if (payload.for === "notes") {
        state.clickValue.forEach((eachO) => {
          if (eachO.id === payload.noteID) {
            eachO.label.forEach((each) => {
              if (each.id === payload.id) {
                each.isChecked = !each.isChecked;
              }
            });
            return;
          }
        });
      }
    },

    deleteImg: (state, action) => {
      state.Img = state.Img.filter((each) => each.id !== action.payload);
    },

    deleteImgForNote: (state, action) => {
      // payload has id and noteID
      const payload = action.payload;
      state.clickValue.map((eachO) => {
        if (eachO.id === payload.noteID) {
          eachO.Img = eachO.Img.filter(
            (o) => o.id !== payload.id && o.id !== "first"
          );
        }
      });
    },

    deleteNote: (state, action) => {
      state.clickValue = state.clickValue.filter(
        (each) => each.id !== action.payload
      );
    },
  },
});

export const {
  updateBoth,
  showCard,
  chooseColor,
  colorForNote,
  idForColor,
  chooseTitleAndText,
  addLabel,
  addImg,
  handleCheckboxChange,
  deleteLabels,
  deleteImg,
  deleteImgForNote,
  deleteNote,
  toggleValue,
} = notesSlice.actions;

export default notesSlice.reducer;
