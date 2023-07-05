import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

//redux
import { store } from "./redux/stor";
import { Provider } from "react-redux";

//components
import Main from "./components/Main";
import EditNote from "./components/EditNote";
import Header from "./components/Header";
import AddUser from "./components/AddUser";
import Footer from "./components/Footer";

function App() {
  const [userName, setUserName] = useState<string>(() => {
    const localStorage = window.localStorage.getItem("userName");
    return localStorage ? JSON.parse(localStorage) : "";
  });
  return (
    <Provider store={store}>
      <Header name={userName} />
      <Routes>
        <Route
          path="/"
          element={
            userName.length ? <Main /> : <AddUser setUserName={setUserName} />
          }
        />
        <Route path="/:source/:id" element={<EditNote />} />
      </Routes>
      <Footer />
    </Provider>
  );
}

export default App;
