import React, { ChangeEvent, useState } from "react";

// redux
import { useDispatch } from "react-redux";

import { NoteType } from "../constants/types";

//utils
import { addToLocalStorage } from "../utils/localStorageFunctions";

//styles
import {
  Card,
  CardContent,
  TextField,
  Button,
  CardActions,
  Typography,
  Grid,
  InputLabel,
} from "@mui/material";
// translation
import { useTranslation } from "react-i18next";

//keys
import { key_Notes } from "../constants/localStorageKeys";

const AddNote: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const contentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content_w = content.replace(/\s/g, "");
    const title_w = title.replace(/\s/g, "");
    if (content_w.length === 0 || title_w.length === 0) {
      alert(t("note-is-not-valid"));
    } else {
      const uniqueId: number = Math.floor(Math.random() * 10000 + 102);
      const data: NoteType = {
        id: uniqueId,
        userId: 1,
        source: "localstorage",
        title: title,
        body: content,
      };
      dispatch({ type: "ADD", payload: data });
      addToLocalStorage(key_Notes, data);
    }
    setContent("");
    setTitle("");
  };
  return (
    <form onSubmit={submitHandler}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2">
            {t("add-note")}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="title">{t("title")}</InputLabel>
              <TextField
                id="title"
                multiline
                rows={1}
                variant="outlined"
                fullWidth
                value={title}
                onChange={titleChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="content">{t("content")}</InputLabel>
              <TextField
                id="content"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                value={content}
                onChange={contentChangeHandler}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button type="submit" size="small">
            {t("add")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AddNote;
