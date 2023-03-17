import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import NavBar from "../../components/Navbar/Navbar";

import useUser from "../../hooks/UseUser";

function App() {
  const { refreshAuth } = useUser();

  React.useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<HomePage />} />
        {/* <Route path="/details/:tt_url" element={<DetailsPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/results/:query" element={<ResultsPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;