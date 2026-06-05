import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

// Admin Pages
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Academic from "../pages/Academic";
import Attendance from "../pages/Attendance";
import Fees from "../pages/Fees";
import Communication from "../pages/Communication";
import Announcement from "../pages/Announcement";

// Students sub-pages
import Reports from "../pages/students/reports";
import Documents from "../pages/students/documents";
import Settings from "../pages/students/settings";
import Approvals from "../pages/students/approvals";

// Teacher Pages
import TeacherDashboard from "../pages/TeacherDashboard";
import Classes from "../pages/teacher/classes";
import TeacherStudents from "../pages/teacher/students";
import TeacherAttendance from "../pages/teacher/attendance";
import Assignment from "../pages/teacher/assignment";
import ExamsMarks from "../pages/teacher/exams-marks";
import TeacherMessages from "../pages/teacher/messages";
import TeacherSettings from "../pages/teacher/settings";

export default function AppRoutes() {
  const [userRole, setUserRole] = useState("admin");

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              currentRole={userRole}
              changeRole={setUserRole}
            />
          }
        >
          {/* Dashboard based on role */}
          <Route
            index
            element={
              userRole === "admin"
                ? <Dashboard />
                : <TeacherDashboard />
            }
          />

          {/* Admin Routes */}
          {userRole === "admin" && (
            <>
              <Route path="students" element={<Students />} />
              <Route path="academic" element={<Academic />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="fees" element={<Fees />} />
              <Route path="communication" element={<Communication />} />
              <Route path="announcement" element={<Announcement />} />

              <Route path="students/reports" element={<Reports />} />
              <Route path="students/documents" element={<Documents />} />
              <Route path="students/settings" element={<Settings />} />
              <Route path="students/approvals" element={<Approvals />} />
            </>
          )}

          {/* Teacher Routes */}
          {userRole === "teacher" && (
            <>
              <Route path="teacher/classes" element={<Classes />} />
              <Route path="teacher/students" element={<TeacherStudents />} />
              <Route path="teacher/attendance" element={<TeacherAttendance />} />
              <Route path="teacher/assignment" element={<Assignment />} />
              <Route path="teacher/exams-marks" element={<ExamsMarks />} />
              <Route path="teacher/messages" element={<TeacherMessages />} />
              <Route path="teacher/settings" element={<TeacherSettings />} />
            </>
          )}
        </Route>
      </Routes>
    </HashRouter>
  );
}