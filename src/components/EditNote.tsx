import React, { ChangeEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { NoteType } from "../constants/types";

//utils
import {
  editFromLocalStorage,
  getOneItemFromLocalStorage,
} from "../utils/localStorageFunctions";
//styles
import {
  Card,
  CardContent,
  TextField,
  Button,
  CardActions,
  Typography,
  Grid,
} from "@mui/material";

// translation
import { useTranslation } from "react-i18next";

//keys
import { key_Notes } from "../constants/localStorageKeys";

const EditNote: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, source } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const contentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    if (source === "api") {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((respone) => respone.json())
        .then((d: NoteType) => {
          setContent(d.body);
          setTitle(d.title);
        });
    } else if (source === "localstorage") {
      if (typeof id === "string") {
        const note: NoteType = getOneItemFromLocalStorage(
          key_Notes,
          Number(id)
        );
        setContent(note.body);
        setTitle(note.title);
      }
    }
  }, []);
  const editHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof id === "string") {
      if (source === "api") {
        dispatch({
          type: "EDIT",
          payload: { id: Number(id), title: title, body: content },
        });
      } else {
        editFromLocalStorage(key_Notes, Number(id), title, content);
      }
    }
    setContent("");
    setTitle("");
    navigate("/", { replace: true });
  };
  return (
    <form onSubmit={editHandler} style={{ minHeight: "85vh" }}>
      <Card sx={{ m: 10 }}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {t("you-can-edit")}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label={t("title")}
                multiline
                rows={1}
                variant="outlined"
                fullWidth
                value={title}
                onChange={titleChangeHandler}
                required
              />
            </Grid>
            <Grid item xs={12}>
              {/* Second text field */}
              <TextField
                name="content"
                label={t("content")}
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                value={content}
                onChange={contentChangeHandler}
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate("/", { replace: true })} size="small">
            {t("back")}
          </Button>
          <Button type="submit" size="small">
            {t("edit")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default EditNote;
