
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/teacherComponent/TeacherHeader";

const TeacherLayout = () => {
  return (
    <div className="teacher-layout">
      <Header />
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
      
    </div>
  );
};

export default TeacherLayout;
