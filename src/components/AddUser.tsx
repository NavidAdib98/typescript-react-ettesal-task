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
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    localStorage.setItem("userName", JSON.stringify(name));
    setUserName(name);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      localStorage.setItem("userName", JSON.stringify(name));
      setUserName(name);
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ minHeight: "85vh" }}>
      <Card sx={{ m: 10 }}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {t("enter-user-name")}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                name="username"
                label={t("name")}
                multiline
                rows={1}
                variant="outlined"
                fullWidth
                value={name}
                onChange={nameChangeHandler}
                onKeyDown={handleKeyDown}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button type="submit" size="small">
            {t("submit")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default EditNote;
