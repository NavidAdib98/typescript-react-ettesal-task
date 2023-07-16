import React from "react";
//components
import Layout from "../layout/Layout";
import AddNote from "../components/AddNote";
import Notes from "../components/Notes";

const HomePage = () => {
  return (
    <Layout>
      <AddNote />
      <br />
      <Notes />
    </Layout>
  );
};

export default HomePage;
