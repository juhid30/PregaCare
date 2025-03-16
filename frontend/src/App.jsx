import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
