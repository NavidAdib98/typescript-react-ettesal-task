import React, { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { NotesReducerStateType } from "../redux/reducer";
import { NoteType } from "../constants/types";

//styles
import { Grid } from "@mui/material";
//components
import Note from "./Note";

//utils
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorageFunctions";

const Notes: React.FC = () => {
  const notes: NoteType[] = useSelector(
    (state: NotesReducerStateType) => state.notes
  );
  const dispatch = useDispatch();

  const deleteHandler = (id: number) => {
    removeFromLocalStorage(id);
    dispatch({ type: "REMOVE", payload: id });
  };

  useEffect(() => {
    const loadData = async () => {
      let respons = await fetch("https://jsonplaceholder.typicode.com/posts");
      let data_api = await respons.json();
      data_api.forEach((d: NoteType) => {
        d.source = "api";
      });
      let data_storage: NoteType[] = getFromLocalStorage();
      dispatch({
        type: "FETCH_ALL_NOTES",
        payload: [...data_storage, ...data_api],
      });
    };
    loadData();
  }, []);

  return (
    <Grid container alignItems="center" spacing={3}>
      {notes.map((note: NoteType) => (
        <Grid key={note.id} item xs={12} sm={6} lg={4}>
          <Note
            id={note.id}
            title={note.title}
            body={note.body}
            userId={note.userId}
            source={note.source}
            deleteHandler={deleteHandler}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Notes;
