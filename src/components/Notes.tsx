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
import { removeFromLocalStorage } from "../utils/localStorageFunctions";

//custom Hooks
import useFetchApi from "../hooks/useFetchApi";
import useGetLocalStorage from "../hooks/useGetLocalStorage";

const Notes: React.FC = () => {
  const { data: data_api } = useFetchApi(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const { data: data_storage } = useGetLocalStorage();

  const notes: NoteType[] = useSelector(
    (state: NotesReducerStateType) => state.notes
  );
  const dispatch = useDispatch();
  const deleteHandler = (id: number) => {
    removeFromLocalStorage(id);
    dispatch({ type: "REMOVE", payload: id });
  };

  useEffect(() => {
    const data: NoteType[] = [...data_storage, ...data_api];
    dispatch({ type: "FETCH_ALL_NOTES", payload: data });
  }, [data_api, data_storage, dispatch]);

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
