import React from "react";

//styles
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
// translation
import { useTranslation } from "react-i18next";
import logo from "../images/logo_ettesal.png";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const changeLanguageHandler = (e: SelectChangeEvent) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt="Logo" height="40" width="40" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ?
          </Typography>
          <Select
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Set the border color to white
              },
              "& .MuiSelect-icon": {
                color: "white", // Set the icon color to white
              },
              "& .MuiInputBase-input": {
                color: "white", // Set the text color to white
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={changeLanguageHandler}
            value={i18n.language}
          >
            <MenuItem value={"en"}>{t("english")}</MenuItem>
            <MenuItem value={"fa"}>{t("farsi")}</MenuItem>
          </Select>
          {/* <select
            className="custom-select"
            style={{ width: 200 }}
            onChange={changeLanguageHandler}
          >
            <option value="en">{t("english")}</option>
            <option value="fa">{t("farsi")}</option>
          </select> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
