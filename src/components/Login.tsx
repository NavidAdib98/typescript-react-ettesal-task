import React, { useState } from "react";

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

// interface Props {
//   setUserName: React.Dispatch<React.SetStateAction<string>>;
// }
interface LoginFormData {
  email: string;
  password: string;
}

const EditNote: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {};

  return (
    <form onSubmit={submitHandler} style={{ minHeight: "85vh" }}>
      <Card sx={{ m: 10 }}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {t("login")}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel required htmlFor="email">
                {t("email")}
              </InputLabel>
              <TextField
                type="email"
                id="email"
                name="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                InputProps={{
                  inputProps: { maxLength: 30 },
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="password" required>
                {t("password")}
              </InputLabel>
              <TextField
                type="password"
                id="password"
                name="password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                InputProps={{
                  inputProps: { maxLength: 20 },
                }}
                required
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
