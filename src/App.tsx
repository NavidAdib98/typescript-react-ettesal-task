import React, { useEffect } from "react";
import "./App.css";

//redux
import { store } from "./redux/stor";
import { Provider } from "react-redux";

//routes
import RouteList from "./routes";

// translation
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <Provider store={store}>
      <RouteList />
    </Provider>
  );
}

export default App;
