// src/pages/Dashboard.jsx

import { useState } from "react";
import DashboardCard from "../components/DashboardCard";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaRupeeSign,
  FaBell,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  // Chart Data Configurations
  const attendanceData = [
    { day: "Mon", value: 50 },
    { day: "Tue", value: 55 },
    { day: "Wed", value: 76 },
    { day: "Thu", value: 64 },
    { day: "Fri", value: 82 },
    { day: "Sat", value: 70 },
    { day: "Sun", value: 91 },
  ];

  const feeData = [
    { month: "Jan", amount: 40 },
    { month: "Feb", amount: 68 },
    { month: "Mar", amount: 60 },
    { month: "Apr", amount: 44 },
    { month: "May", amount: 88 },
    { month: "Jun", amount: 48 },
  ];

  // Dynamic Recent Activity Log State
  const [activities, setActivities] = useState([
    { id: 1, type: "admission", title: "Liam smith admitted to Grade 5", meta: "AE · Admin Elena . 3 minutes ago", icon: <FaUserGraduate className="text-emerald-600 text-sm" />, bg: "bg-emerald-50" },
    { id: 2, type: "fee", title: "Emily Brown paid fee for Term 1", meta: "EB · Emily Brown . 12 minutes ago", icon: <FaRupeeSign className="text-indigo-600 text-sm" />, bg: "bg-indigo-50" },
    { id: 3, type: "admission", title: "Emily Brown admitted to Grade 6", meta: "AE · Admin Elena . 25 minutes ago", icon: <FaUserGraduate className="text-emerald-600 text-sm" />, bg: "bg-emerald-50" },
    { id: 4, type: "fee", title: "Emily Brown paid fee for Term 2", meta: "EB · Emily Brown . 1 hour ago", icon: <FaRupeeSign className="text-indigo-600 text-sm" />, bg: "bg-indigo-50" },
    { id: 5, type: "attendance", title: "Attendance marked for grade 5A", meta: "SC · Sarah Connor . 2 hours ago", icon: <FaCheckCircle className="text-teal-600 text-sm" />, bg: "bg-teal-50" },
  ]);

  // Dynamic Alerts Notification Badge State
  const [unreadAlertsCount, setUnreadAlertsCount] = useState(4);

  // Dynamic Pending Approvals State Array
  const [approvals, setApprovals] = useState([
    { id: 1, name: "Sarah Connor", type: "Leave", detail: "Medical leave request for 3 days", tagBg: "bg-orange-50 text-orange-600 border border-orange-100" },
    { id: 2, name: "James Porter", type: "Attendance Edit", detail: "Request to correct attendance", tagBg: "bg-amber-50 text-amber-600 border border-amber-100" },
    { id: 3, name: "Robert Chen", type: "Attendance Edit", detail: "Attendance correction", tagBg: "bg-amber-50 text-amber-600 border border-amber-100" }
  ]);

  // Inline Decision Processor (Removes Item and Logs to Activity Column without alerts)
  const handleApprovalDecision = (id, actionType, itemName, itemDetail) => {
    // 1. Drop the approved/rejected item seamlessly from view
    setApprovals(prevApprovals => prevApprovals.filter(item => item.id !== id));

    // 2. Format a new activity ledger entry object
    const newActivityLog = {
      id: Date.now(), 
      type: actionType === "Approve" ? "admission" : "attendance",
      title: `${itemName}'s ${itemDetail.toLowerCase()} was ${actionType.toLowerCase()}d`,
      meta: `AE · Admin Elena · Just Now`,
      icon: actionType === "Approve" ? <FaCheckCircle className="text-emerald-600 text-sm" /> : <FaExclamationTriangle className="text-red-500 text-sm" />,
      bg: actionType === "Approve" ? "bg-emerald-50" : "bg-red-50"
    };

    // 3. Prepend directly onto the activity log scroll viewport
    setActivities(prevActivities => [newActivityLog, ...prevActivities]);
  };

  const handleAlertDismissal = () => {
    if (unreadAlertsCount > 0) {
      setUnreadAlertsCount(prev => prev - 1);
    }
  };

  return (
    <div className="flex-1 bg-[#F4F9F9] p-8 overflow-y-auto space-y-8">
      
      {/* 1. TOP HEADER ACTIONS */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="w-full lg:w-1/2 relative">
          <input
            type="text"
            placeholder="Search......"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#EDF5F5] rounded-2xl px-6 py-3.5 pl-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-transparent"
          />
          <span className="absolute left-5 top-4 text-gray-400">🔍</span>
        </div>

        <div className="flex gap-3 w-full lg:w-auto justify-end">
          <button className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-full shadow-sm hover:bg-gray-50 border border-gray-100 transition">
            + Add Student
          </button>
          <button className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition">
            🔔 New Announcement
          </button>
        </div>
      </div>

      {/* 2. HEADING SEGMENT */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-400 font-medium mt-1">Welcome Back, Elena! Here's what's happening today.</p>
      </div>

      {/* 3. ANALYTIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard title="Total Students" value="1,250" growth="3.5%" subtitle="Enrolled this year" icon={<FaUserGraduate className="text-indigo-600 text-2xl" />} />
        <DashboardCard title="Total Staff" value="85" growth="1.2%" subtitle="Active Employees" icon={<FaChalkboardTeacher className="text-indigo-600 text-2xl" />} />
        <DashboardCard title="Total Classes" value="48" growth="0.8%" subtitle="Across all grades" icon={<FaBookOpen className="text-indigo-600 text-2xl" />} />
        <DashboardCard title="Total Revenue" value="152K" growth="4.5%" subtitle="Collected this term" icon={<FaRupeeSign className="text-indigo-600 text-2xl" />} />
      </div>

      {/* 4. CHARTS SECTION */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Attendance Overview */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Attendance overview</h2>
          <p className="text-gray-400 font-medium text-sm mt-1">Last 7 days across all classes</p>
          <div className="h-72 mt-8 pr-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} dy={12} tick={{ fill: '#000', fontWeight: '700', fontSize: '12px' }} />
                <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(val) => `${val}%`} axisLine={false} tickLine={false} tick={{ fill: '#000', fontWeight: '700', fontSize: '12px' }} />
                <Tooltip formatter={(value) => [`Attendance ${value}%`]} labelFormatter={(label) => `${label}:`} contentStyle={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)", padding: "10px 16px", fontWeight: "700" }} labelStyle={{ color: "#64748B" }} />
                <Line type="natural" dataKey="value" stroke="#3B44F6" strokeWidth={3} dot={{ r: 4, stroke: '#3B44F6', strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, stroke: '#3B44F6', strokeWidth: 2, fill: '#3B44F6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Fee collection</h2>
          <p className="text-gray-400 font-medium text-sm mt-1">Monthly collection K</p>
          <div className="h-72 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} dy={12} tick={{ fill: '#64748B', fontWeight: '500', fontSize: '12px' }} />
                <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontWeight: '500', fontSize: '12px' }} />
                <Tooltip formatter={(value) => [`Fee Collected : ${value}K`]} labelFormatter={(label) => `${label}`} contentStyle={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)", padding: "10px 16px", fontWeight: "700" }} labelStyle={{ color: "#000", fontWeight: '700' }} />
                <Bar dataKey="amount" fill="#B4ACEF" radius={[12, 12, 0, 0]} maxBarSize={38} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-gray-400 text-xs mt-4 flex items-center justify-center gap-2 font-medium">
            <span className="w-3 h-2.5 bg-[#B4ACEF] rounded-[3px] inline-block"></span> Collected
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE LOWER LAYOUT GRID PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Recent Activity Log */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <p className="text-gray-400 text-xs font-medium mt-0.5 mb-6">Live update from today</p>
          
          <div className="space-y-5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-4 animate-fadeIn">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${act.bg}`}>
                  {act.icon}
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 leading-tight">{act.title}</h4>
                  <p className="text-[11px] text-gray-400 font-medium mt-1 uppercase tracking-wide">{act.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Notification Alerts */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-bold text-gray-900">Alert</h2>
            {unreadAlertsCount > 0 && (
              <span className="bg-red-50 text-red-500 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                {unreadAlertsCount} New
              </span>
            )}
          </div>
          <p className="text-gray-400 text-xs font-medium mb-6">{unreadAlertsCount} unread notifications</p>
          
          <div className="space-y-3">
            <div onClick={handleAlertDismissal} className="bg-[#F0F7FF] border border-[#E0EFFF] rounded-2xl p-4 flex gap-4 cursor-pointer hover:opacity-80 transition">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                <FaBell size={14} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900">New Admission Request</h4>
                <p className="text-[12px] text-gray-500 mt-0.5">A New admission request has been submitted for Grade 5</p>
              </div>
            </div>

            <div onClick={handleAlertDismissal} className="bg-[#F0F7FF] border border-[#E0EFFF] rounded-2xl p-4 flex gap-4 cursor-pointer hover:opacity-80 transition">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                <FaBell size={14} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900">Approval Request</h4>
                <p className="text-[12px] text-gray-500 mt-0.5">Sarah Connor submitted a leave request.</p>
              </div>
            </div>

            <div onClick={handleAlertDismissal} className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl p-4 flex gap-4 cursor-pointer hover:opacity-80 transition">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                <FaExclamationTriangle size={14} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900">Fee payment overdue</h4>
                <p className="text-[12px] text-gray-500 mt-0.5">12 Students have overdue fee payments.</p>
              </div>
            </div>

            <div onClick={handleAlertDismissal} className="bg-[#FFFBEB] border border-[#FEF3C7] rounded-2xl p-4 flex gap-4 cursor-pointer hover:opacity-80 transition">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                <FaExclamationTriangle size={14} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900">Attendance Alert</h4>
                <p className="text-[12px] text-gray-500 mt-0.5">Attendance below 75% for 5 students this week.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Inline Non-Popup Pending Approvals */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-bold text-gray-900">Pending Approvals</h2>
            {approvals.length > 0 && (
              <span className="bg-amber-100 text-amber-700 font-bold text-[11px] w-5 h-5 flex items-center justify-center rounded-full">
                {approvals.length}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-xs font-medium mb-6">Require your action</p>
          
          <div className="space-y-4">
            {approvals.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm font-semibold border-2 border-dashed border-gray-100 rounded-2xl">
                All requests caught up! 🎉
              </div>
            ) : (
              approvals.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-2xl p-4 space-y-3 shadow-[0_2px_12px_rgba(0,0,0,0.01)] transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900">{item.name}</h4>
                      <p className="text-[12px] text-gray-400 mt-0.5 font-medium">{item.detail}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 whitespace-nowrap ${item.tagBg}`}>
                      {item.type}
                    </span>
                  </div>
                  
                  {/* Action Buttons with state-based handlers */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleApprovalDecision(item.id, "Approve", item.name, item.detail)}
                      className="flex-1 bg-[#059669] text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#047857] transition shadow-sm active:scale-[0.98]"
                    >
                      <span>✓</span> Approve
                    </button>
                    <button 
                      onClick={() => handleApprovalDecision(item.id, "Reject", item.name, item.detail)}
                      className="flex-1 bg-white border border-red-200 text-red-500 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-red-50 transition active:scale-[0.98]"
                    >
                      <span>✕</span> Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}