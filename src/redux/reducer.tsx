import { NoteType } from "../constants/types";

export interface NotesReducerStateType {
  notes: NoteType[];
}

// Define the initial state
const initialState: NotesReducerStateType = {
  notes: [],
};

// Define the action type
type AppAction = {
  type: string;
  payload?: any;
};

// Define the reducer function
const NotesReducer = (
  state: NotesReducerStateType = initialState,
  action: AppAction
): NotesReducerStateType => {
  switch (action.type) {
    case "FETCH_ALL_NOTES":
      return { notes: action.payload };
    case "ADD":
      return { notes: [action.payload, ...state.notes] };
    case "REMOVE":
      let filterd = state.notes.filter((item) => item.id !== action.payload);
      return { notes: filterd };
    case "EDIT":
      let filterd1 = state.notes.filter(
        (item) => item.id !== action.payload.id
      );
      let note: NoteType = state.notes.filter(
        (item) => item.id === action.payload.id
      )[0];
      note.body = action.payload.body;
      note.title = action.payload.title;
      return { notes: [note, ...filterd1] };

    default:
      return state;
  }
};

export default NotesReducer;
