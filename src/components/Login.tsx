import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { KeycloakLoginOptions, Acr } from "keycloak-js";
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
  phone: string;
  password: string;
}

const Login: React.FC = () => {
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<LoginFormData>({
    phone: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(keycloak);
    // const credentials: KeycloakLoginOptions = {
    //   grant_type: "password",
    //   username: formData.phone,
    //   password: formData.password,
    // };

    // keycloak
    //   .login(credentials)
    //   .then((authenticated) => {
    //     // Handle successful authentication
    //   })
    //   .catch((error) => {
    //     // Handle authentication error
    //   });
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
              <InputLabel required htmlFor="phone">
                {t("phone")}
              </InputLabel>
              <TextField
                placeholder="0912..."
                type="tel"
                id="phone"
                name="phone"
                variant="outlined"
                fullWidth
                value={formData.phone}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                InputProps={{
                  inputProps: { type: "tel", pattern: "[0-9]*" },
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
