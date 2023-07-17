import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { KeycloakLoginOptions, Acr } from "keycloak-js";
import { useNavigate } from "react-router-dom";

//plogin
import plogin from "../auth/plogin";

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

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const username = formData.username; //formData.username;
  const password = formData.password; //formData.password;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await plogin(keycloak, username, password);
      if (keycloak.authenticated) {
        console.log("User is authenticated");
        navigate("/dashboard");
      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      let e = error as Error;
      console.error(e.message);
    }
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
              <InputLabel required htmlFor="username">
                {t("username")}
              </InputLabel>
              <TextField
                placeholder="username..." //"0912..."
                type="text"
                id="username"
                name="username"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                InputProps={{
                  inputProps: { type: "tel" }, // pattern: "[0-9]*"
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

export default Login;
