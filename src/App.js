import React from "react";
import Home from "./pages/Home";
import AddDataToFirebase from "./helper/AddDataToFirebase";

function App() {
  return (
    <div>
      <Home />
      <AddDataToFirebase />
    </div>
  );
}

export default App;
