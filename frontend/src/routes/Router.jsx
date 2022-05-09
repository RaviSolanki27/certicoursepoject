import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import UploadCourse from "../components/uploadcourse/UploadCourse";
import CoursePage from "../pages/CoursePage";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";

function Router() {
  return (
    <div style={{ height:"100%", display: "flex", flexDirection: "column" }}>
      <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/course/:id" element={<CoursePage />} />
        <Route exact path="/upload" element={<UploadCourse />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="*" element={<HomePage />} />
      </Routes>
      </div>

      <div style={{marginTop:'auto'}}>
        <Footer />
      </div>
    </div>
  );
}

export default Router;
