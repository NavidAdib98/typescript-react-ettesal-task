import React, { ChangeEvent, useState } from "react";

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

interface Props {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const EditNote: React.FC<Props> = ({ setUserName }: Props) => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const clickHandler = () => {
    localStorage.setItem("userName", JSON.stringify(name));
    setUserName(name);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {t("enter-user-name")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label={t("name")}
              multiline
              rows={1}
              variant="outlined"
              fullWidth
              value={name}
              onChange={nameChangeHandler}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={clickHandler} size="small">
          {t("submit")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditNote;
