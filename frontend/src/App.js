import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage.js";
import Chatpage from "./components/Chatpage.js";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </div>
  );
};

export default App;
