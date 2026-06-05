import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarCheck,
  IndianRupee,
  MessageSquare,
  BarChart3,
  Folder,
  Settings,
  CheckSquare,
  Megaphone,
  LogOut,
  X,
  Presentation, 
  FileSpreadsheet, 
  GraduationCap 
} from "lucide-react";

export default function Sidebar({ currentRole = "admin", changeRole }) {
  const location = useLocation();

  // --- OVERLAY MODAL STATES ---
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleRoleSignIn = () => {
    setIsLogoutModalOpen(false);
    if (changeRole) {
      changeRole(selectedRole);
    }
  };

  return (
    <div className="w-64 bg-[#2e45e4] text-white min-h-screen p-6 flex flex-col justify-between select-none shrink-0 font-sans relative">
      
      <div className="space-y-7">
        
        {/* --- BRAND LOGO HEADER --- */}
        <div className="flex items-center gap-3 py-2 px-1">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
            <BookOpen className="text-white text-xl" size={20} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tight font-serif italic">
            EDuSMART
          </span>
        </div>

        {/* --- DYNAMIC NAVIGATION LINKS BLOCK --- */}
        <nav className="space-y-1.5">
          {currentRole === "admin" ? (
            /* ========================================================
               ADMIN PANEL LINKS (Your Original Dashboard Architecture)
               ======================================================== */
            <>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <LayoutDashboard size={20} strokeWidth={2.2} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink 
                to="/students" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <Users size={20} strokeWidth={2.2} />
                <span>User Management</span>
              </NavLink>

              <NavLink 
                to="/academic" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <BookOpen size={20} strokeWidth={2.2} />
                <span>Academic</span>
              </NavLink>

              <NavLink 
                to="/attendance" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <CalendarCheck size={20} strokeWidth={2.2} />
                <span>Attendance</span>
              </NavLink>

              <NavLink 
                to="/fees" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <IndianRupee size={20} strokeWidth={2.2} />
                <span>Fees</span>
              </NavLink>

              <NavLink 
                to="/communication" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive || location.pathname === "/communication"
                      ? "bg-white/20 text-white shadow-sm backdrop-blur-md" 
                      : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <MessageSquare size={20} strokeWidth={2.2} />
                <span>Communication</span>
              </NavLink>

              <NavLink 
                to="/announcement" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <Megaphone size={20} strokeWidth={2.2} />
                <span>Announcement</span>
              </NavLink>

              {/* --- ALWAYS VISIBLE EXTRA PAGES BLOCK --- */}
              <div className="pt-2 space-y-1.5 border-t border-white/10 mt-2">
                <NavLink 
                  to="/students/reports" 
                  className={({ isActive }) => 
                    `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                      isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                    }`
                  }
                >
                  <BarChart3 size={20} strokeWidth={2.2} />
                  <span>Reports</span>
                </NavLink>

                <NavLink 
                  to="/students/documents" 
                  className={({ isActive }) => 
                    `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                      isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                    }`
                  }
                >
                  <Folder size={20} strokeWidth={2.2} />
                  <span>Documents</span>
                </NavLink>

                <NavLink 
                  to="/students/settings" 
                  className={({ isActive }) => 
                    `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                      isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                    }`
                  }
                >
                  <Settings size={20} strokeWidth={2.2} />
                  <span>Settings</span>
                </NavLink>

                <NavLink 
                  to="/students/approvals" 
                  className={({ isActive }) => 
                    `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                      isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                    }`
                  }
                >
                  <CheckSquare size={20} strokeWidth={2.2} />
                  <span>Approvals</span>
                </NavLink>
              </div>
            </>
          ) : (
            /* ========================================================
               TEACHER PANEL LINKS
               ======================================================== */
            <>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <LayoutDashboard size={20} strokeWidth={2.2} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink 
                to="/teacher/classes" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <Presentation size={20} strokeWidth={2.2} />
                <span>My Classes</span>
              </NavLink>

              <NavLink 
                to="/teacher/students" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <Users size={20} strokeWidth={2.2} />
                <span>Students</span>
              </NavLink>

              <NavLink 
                to="/teacher/attendance" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <CalendarCheck size={20} strokeWidth={2.2} />
                <span>Attendance</span>
              </NavLink>

              <NavLink 
                to="/teacher/assignment" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <FileSpreadsheet size={20} strokeWidth={2.2} />
                <span>Assignment</span>
              </NavLink>

              <NavLink 
                to="/teacher/exams-marks" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <GraduationCap size={20} strokeWidth={2.2} />
                <span>Exams & Marks</span>
              </NavLink>

              <NavLink 
                to="/teacher/messages" 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                  }`
                }
              >
                <MessageSquare size={20} strokeWidth={2.2} />
                <span>Messages</span>
              </NavLink>

              <div className="pt-2 space-y-1.5 border-t border-white/10 mt-2">
                <NavLink 
                  to="/teacher/settings" 
                  className={({ isActive }) => 
                    `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 ${
                      isActive ? "bg-white/15 text-white shadow-xs" : "text-white/90 hover:bg-white/5"
                    }`
                  }
                >
                  <Settings size={20} strokeWidth={2.2} />
                  <span>Settings</span>
                </NavLink>
              </div>
            </>
          )}
        </nav>
      </div>

      {/* --- BOTTOM SECTION: ACCOUNT IDENTITY & LOG OUT TRIGGER --- */}
      <div className="mt-auto pt-4 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 border-2 border-white/40 flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
              alt="User Profile Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-black truncate text-white">Sarah Johnson</h4>
            <span className="text-xs text-white/60 font-medium block capitalize">
              {currentRole} Access
            </span>
          </div>
        </div>

        {/* 🔄 CHANGED: Button text renamed from 'Switch Portal' to 'Log Out' */}
        <button 
          onClick={() => {
            setSelectedRole(currentRole); 
            setIsLogoutModalOpen(true);
          }}
          className="w-full flex items-center gap-4 px-4 py-3 text-white/80 hover:text-white rounded-2xl hover:bg-white/10 transition-all font-bold text-[15px]"
        >
          <LogOut size={20} strokeWidth={2.2} />
          <span>Log Out</span>
        </button>
      </div>

      {/* --- MODAL SWITCH INTERFACE OVERLAY --- */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
          <div className="bg-[#FFFDF6] rounded-[36px] w-full max-w-lg shadow-2xl relative border border-amber-100/20 overflow-hidden flex flex-col text-slate-800">
            
            <button 
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-black/5 hover:bg-black/10 rounded-full text-slate-500 transition-colors z-10"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            <div className="p-8 md:p-10 flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
                <p className="text-base font-bold text-slate-400 mt-1">Sign into your careerwave account</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-1.5 bg-slate-100/60 rounded-2xl mb-8">
                <button
                  type="button"
                  onClick={() => setSelectedRole("admin")}
                  className={`py-3 px-6 rounded-xl font-bold text-sm tracking-wide transition-all ${
                    selectedRole === "admin" ? "bg-[#6349E2] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("teacher")}
                  className={`py-3 px-6 rounded-xl font-bold text-sm tracking-wide transition-all ${
                    selectedRole === "teacher" ? "bg-[#6349E2] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Teacher
                </button>
              </div>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">Email</label>
                  <input 
                    type="text" 
                    disabled
                    placeholder="Enter your Email" 
                    className="w-full bg-white border border-teal-600/30 rounded-2xl py-3.5 px-4 text-sm font-medium text-slate-400 focus:outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">Password</label>
                  <input 
                    type="password" 
                    disabled
                    placeholder="Enter your password" 
                    className="w-full bg-white border border-teal-600/30 rounded-2xl py-3.5 px-4 text-sm font-medium text-slate-400 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                onClick={handleRoleSignIn}
                className="w-full bg-[#6349E2] hover:bg-[#5037C9] text-white py-4 rounded-2xl font-bold text-sm tracking-wider shadow-lg shadow-indigo-100 transition-all text-center"
              >
                Sign in
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}