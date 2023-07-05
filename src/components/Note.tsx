import React from "react";
import { NoteType } from "../constants/types";
import { useNavigate } from "react-router-dom";
//styles
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

// translation
import { useTranslation } from "react-i18next";

interface Props extends NoteType {
  deleteHandler(id: number): void;
}

const Note: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const { id, source, title, body, deleteHandler } = props;
  const navigate = useNavigate();
  const EditHandler = () => {
    navigate(`/${source}/${id}`);
  };

  return (
    <Card sx={{ minWidth: 275, height: 300 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          height={100}
          sx={{ overflowY: "auto" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" height={100} sx={{ overflowY: "auto" }}>
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => deleteHandler(id)} size="small">
          {t("delete")}
        </Button>
        <Button onClick={EditHandler} size="small">
          {t("edit")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Note;
