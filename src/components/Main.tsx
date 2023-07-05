import React from "react";

//components
import Notes from "./Notes";
import AddNote from "./AddNote";

const Main: React.FC = () => {
  return (
    <div style={{ margin: "80px 10px" }}>
      <AddNote />
      <br />
      <Notes />
    </div>
  );
};

export default Main;
