import React from "react";
//components
import Layout from "../layout/Layout";
import AddNote from "../components/AddNote";
import Notes from "../components/Notes";
import Login from "../components/Login";

const HomePage = () => {
  return (
    <Layout>
      <Login />
      <AddNote />
      <br />
      <Notes />
    </Layout>
  );
};

export default HomePage;
