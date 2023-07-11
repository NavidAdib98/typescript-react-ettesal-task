import { NoteType } from "../constants/types";

export interface NotesReducerStateType {
  notes: NoteType[];
  error: boolean;
  status: string;
}

// Define the initial state
const initialState: NotesReducerStateType = {
  notes: [],
  error: false,
  status: "ideal",
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
    case "FETCH_REQUEST":
      return { notes: [], error: false, status: "loading" };
    case "FETCH_SUCCESS":
      return { notes: action.payload, error: false, status: "success" };
    case "FETCH_ERROR":
      return { notes: [], error: true, status: action.payload };
    case "ADD":
      return { ...state, notes: [action.payload, ...state.notes] };
    case "REMOVE":
      let filterd = state.notes.filter((item) => item.id !== action.payload);
      return { ...state, notes: filterd };
    case "EDIT":
      let filterd1 = state.notes.filter(
        (item) => item.id !== action.payload.id
      );
      let note: NoteType = state.notes.filter(
        (item) => item.id === action.payload.id
      )[0];
      note.body = action.payload.body;
      note.title = action.payload.title;
      return { ...state, notes: [note, ...filterd1] };

    default:
      return state;
  }
};

export default NotesReducer;
