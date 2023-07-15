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

//keys
import { key_Notes } from "../constants/localStorageKeys";

const Notes: React.FC = () => {
  const { data: data_api, error: error_api } = useFetchApi(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const { data: data_storage } = useGetLocalStorage();

  const { notes, status, error } = useSelector(
    (state: NotesReducerStateType) => state
  );
  const dispatch = useDispatch();
  const deleteHandler = (id: number) => {
    removeFromLocalStorage(key_Notes, id);
    dispatch({ type: "REMOVE", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST" });
    const data: NoteType[] = [...data_storage, ...data_api];
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  }, [data_api, data_storage, dispatch]);

  useEffect(() => {
    dispatch({ type: "FETCH_ERROR", payload: error_api });
  }, [error_api]);

  return (
    <Grid container alignItems="center" spacing={3}>
      {status === "success" &&
        error === false &&
        notes.map((note: NoteType) => (
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
