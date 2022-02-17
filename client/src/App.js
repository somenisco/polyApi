import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import PasteArea from "./Containers/PasteArea";
import PasteContent from "./Containers/PasteContent";
import PastesContainer from "./Containers/PastesContainer";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "./Containers/NavBar";

function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" exact element={<PasteArea />} />
          <Route path="/:pasteid" element={<PasteContent />} />
          <Route path="/pastes" element={<PastesContainer />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
