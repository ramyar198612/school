// src/pages/UserManagement.jsx

import { useState } from "react";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBookOpen, 
  FaRupeeSign, 
  FaFileAlt,      // Icon for Reports
  FaFolderOpen,   // Icon for Documents
  FaCog,          // Icon for Settings
  FaCheckSquare,  // Icon for Approvals
  FaSearch, 
  FaPlus, 
  FaFileImport, 
  FaChevronDown, 
  FaFilter 
} from "react-icons/fa";

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("Students");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grade");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // Core Main Menu Items
  const coreLinks = [
    { name: "Dashboard", icon: "📊", active: false },
    { name: "User Management", icon: "👥", active: true },
    { name: "Academic", icon: "📖", active: false },
    { name: "Attendance", icon: "📅", active: false },
    { name: "Fees", icon: "₹", active: false },
    { name: "Communication", icon: "💬", active: false },
  ];

  // PAGE-SPECIFIC EXTRA LINKS (Only renders on this User Management context)
  const extraLinks = [
    { name: "Reports", icon: <FaFileAlt className="text-lg" /> },
    { name: "Documents", icon: <FaFolderOpen className="text-lg" /> },
    { name: "Settings", icon: <FaCog className="text-lg" /> },
    { name: "Approvals", icon: <FaCheckSquare className="text-lg" /> },
  ];

  // Mock Table Data matching the design viewport
  const studentsData = [
    {
      id: "STU-24001",
      name: "Alex Johnson",
      email: "alex.j@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      grade: "Grade 5 · A",
      guardian: "Michael Johnson",
      relationship: "Father",
      status: "Active",
      joinedDate: "Oct 24, 2023"
    },
    // Add additional mock rows here if desired
  ];

  return (
    <div className="flex min-h-screen bg-[#3B44F6]">
      
      {/* 1. COMPOSITE SIDEBAR WITH PAGE-SPECIFIC EXTRA LINKS */}
      <div className="w-64 hidden xl:flex flex-col text-white p-6 justify-between select-none shrink-0">
        <div className="space-y-8">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 text-2xl font-bold tracking-wide">
            <span className="p-2 bg-white/20 rounded-xl">🎓</span>
            <span>EDUSMART</span>
          </div>

          {/* Main Links */}
          <nav className="space-y-1">
            {coreLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-semibold transition-all ${
                  link.active 
                    ? "bg-white/10 text-white shadow-sm" 
                    : "text-white/70 hover:bg-white/5"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}

            {/* Separator Line before Extra Context Pages */}
            <div className="border-t border-white/10 my-4 pt-4">
              <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest pl-4 mb-2">Management Extras</p>
            </div>

            {/* PAGE SPECIFIC ITEMS (Reports, Documents, Settings, Approvals) */}
            {extraLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className="flex items-center gap-4 px-4 py-3 rounded-2xl font-semibold text-white/70 hover:bg-white/5 transition-all"
              >
                <span className="opacity-80">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* 2. MAIN CONTENT VIEWPORT CANVAS */}
      <div className="flex-1 bg-[#F4F9F9] xl:my-3 xl:mr-3 xl:rounded-[32px] p-8 shadow-inner overflow-y-auto flex flex-col space-y-6">
        
        {/* Top Search Bar Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="w-full lg:w-1/2 relative">
            <input
              type="text"
              placeholder="Search......"
              className="w-full bg-[#EDF5F5] rounded-2xl px-6 py-3.5 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-transparent"
            />
            <span className="absolute left-5 top-4 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Page Title Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
            <p className="text-gray-400 font-medium mt-1">Manage Students, Staffs and parents across the school</p>
          </div>
          
          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-white text-gray-700 border border-gray-200/80 rounded-2xl px-5 py-3 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm">
              <FaFileImport className="text-gray-400" /> Import Excel
            </button>
            <button className="flex-1 sm:flex-none bg-[#3B44F6] text-white rounded-2xl px-5 py-3 font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md">
              <FaPlus /> Add Student
            </button>
          </div>
        </div>

        {/* Sub-Category Interactive Pill Tabs (Students, Staff, Parents) */}
        <div className="flex bg-[#EDF5F5] p-1.5 rounded-2xl w-fit gap-2">
          <button 
            onClick={() => setActiveTab("Students")}
            className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "Students" ? "bg-white text-[#3B44F6] shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            Students <span className={`text-xs px-2 py-0.5 rounded-md ${activeTab === "Students" ? "bg-indigo-50 text-indigo-600" : "bg-gray-200 text-gray-600"}`}>25</span>
          </button>
          <button 
            onClick={() => setActiveTab("Staff")}
            className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "Staff" ? "bg-white text-[#3B44F6] shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            Staff <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-md">10</span>
          </button>
          <button 
            onClick={() => setActiveTab("Parents")}
            className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "Parents" ? "bg-white text-[#3B44F6] shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
          >
            Parents <span className="bg-emerald-50 text-emerald-600 text-xs px-2 py-0.5 rounded-md">05</span>
          </button>
        </div>

        {/* Filter Toolbar controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
            <FaSearch className="absolute left-4 top-4 text-gray-400 text-sm" />
          </div>

          <div className="flex gap-3 w-full md:w-auto justify-end">
            {/* Grade Selector Dropdown */}
            <div className="relative bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700 hover:bg-gray-50 min-w-[120px]">
              <FaFilter className="text-gray-400 text-xs" />
              <span>{selectedGrade}</span>
              <FaChevronDown className="text-gray-400 ml-auto text-xs" />
            </div>
            
            {/* Status Selector Dropdown */}
            <div className="relative bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700 hover:bg-gray-50 min-w-[120px]">
              <FaFilter className="text-gray-400 text-xs" />
              <span>{selectedStatus}</span>
              <FaChevronDown className="text-gray-400 ml-auto text-xs" />
            </div>
          </div>
        </div>

        {/* 3. MANAGEMENT GRID RECORDS DATA TABLE */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)] overflow-hidden flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EBF5F5]/60 text-[#3F4E4E] font-extrabold text-xs tracking-wider border-b border-gray-100">
                  <th className="py-4 px-6 font-bold">STUDENT DETAILS</th>
                  <th className="py-4 px-6 font-bold">STUDENT ID</th>
                  <th className="py-4 px-6 font-bold">GRADE/CLASS</th>
                  <th className="py-4 px-6 font-bold">GUARDIAN</th>
                  <th className="py-4 px-6 font-bold">STATUS</th>
                  <th className="py-4 px-6 font-bold">JOINED DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium text-sm text-gray-800">
                {studentsData.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* User Profile Cell */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-400">{student.email}</div>
                      </div>
                    </td>

                    {/* Registration ID Token */}
                    <td className="py-4 px-6 font-mono text-gray-600 font-semibold">{student.id}</td>

                    {/* Educational allocation level badges */}
                    <td className="py-4 px-6">
                      <span className="bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold px-3 py-1 rounded-full border border-[#E0E7FF]">
                        {student.grade}
                      </span>
                    </td>

                    {/* Assigned Legal Representative */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{student.guardian}</div>
                      <div className="text-xs text-gray-400 font-normal">{student.relationship}</div>
                    </td>

                    {/* Enrolment Status indicators */}
                    <td className="py-4 px-6">
                      <span className="bg-[#ECFDF5] text-[#059669] text-xs font-extrabold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>
                        {student.status}
                      </span>
                    </td>

                    {/* Registry timestamp logging entry */}
                    <td className="py-4 px-6 text-gray-500 font-medium">{student.joinedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}