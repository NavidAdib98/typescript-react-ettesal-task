import React from "react";
//styles
import { AppBar, Toolbar, Typography } from "@mui/material";
// translation
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  return (
    <AppBar position="static" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Typography variant="body2" color="inherit" align="center">
          &copy; {currentYear} {t("ettesal")}, {t("rigth-reserve")}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Footer;
