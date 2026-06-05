import React, { useState } from "react";
import { Search, ChevronDown, Sparkles, X, Bot, TrendingUp, Lightbulb, AlertTriangle, CheckCircle, Calendar, Save, BarChart3 } from "lucide-react";

export default function Attendance() {
  // --- APPLICATION STATE INTERFACES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class 10-A"); // Defaulting to 10-A based on layout goals
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState("insights");

  // --- COHORT DATABASE ROSTER ---
  const [students, setStudents] = useState([
    { id: "STU-2023-010", name: "Emma Watson", subId: "STU-2023-001", classBadge: "Class 10-A", status: "Present", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { id: "STU-2023-042", name: "Marcus Johnson", subId: "STU-2023-042", classBadge: "Class 10-B", status: "Absent", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
    { id: "STU-2023-118", name: "Sophia Chen", subId: "STU-2023-118", classBadge: "Class 10-A", status: "Present", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
    { id: "STU-2023-055", name: "Lucas Garcia", subId: "Class 10-C", classBadge: "Class 10-C", status: "Late", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { id: "STU-2023-089", name: "Olivia Smith", subId: "STU-2023-089", classBadge: "Class 10-B", status: "Present", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
    { id: "STU-2023-201", name: "Ethan Nguyen", subId: "STU-2023-201", classBadge: "Class 10-A", status: "Present", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150" },
    { id: "STU-2023-227", name: "Aarohi Patel", subId: "STU-2023-227", classBadge: "Class 10-A", status: "Present", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" }
  ]);

  // --- ACTUAL DYNAMIC HISTORICAL DATA BY CLASS SELECTION ---
  const classAnalyticsData = {
    "Class 10-A": [
      { month: "Jan", present: 94, late: 4, absent: 2 },
      { month: "Feb", present: 88, late: 7, absent: 5 },
      { month: "Mar", present: 91, late: 6, absent: 3 },
      { month: "Apr", present: 95, late: 3, absent: 2 },
      { month: "May", present: 89, late: 8, absent: 3 }
    ],
    "Class 10-B": [
      { month: "Jan", present: 85, late: 10, absent: 5 },
      { month: "Feb", present: 90, late: 6, absent: 4 },
      { month: "Mar", present: 87, late: 8, absent: 5 },
      { month: "Apr", present: 92, late: 5, absent: 3 },
      { month: "May", present: 94, late: 4, absent: 2 }
    ],
    "Class 10-C": [
      { month: "Jan", present: 80, late: 12, absent: 8 },
      { month: "Feb", present: 85, late: 9, absent: 6 },
      { month: "Mar", present: 89, late: 7, absent: 4 },
      { month: "Apr", present: 88, late: 8, absent: 4 },
      { month: "May", present: 91, late: 6, absent: 3 }
    ],
    "All": [
      { month: "Jan", present: 86, late: 9, absent: 5 },
      { month: "Feb", present: 87, late: 7, absent: 6 },
      { month: "Mar", present: 89, late: 7, absent: 4 },
      { month: "Apr", present: 91, late: 5, absent: 4 },
      { month: "May", present: 91, late: 6, absent: 3 }
    ]
  };

  // Switch status inside row elements
  const handleStatusChange = (studentId, newStatus) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    );
  };

  // Fast header-click actions handler
  const markAllAs = (targetStatus) => {
    const filteredIds = filteredStudents.map(s => s.id);
    setStudents(prev =>
      prev.map(student =>
        filteredIds.includes(student.id) ? { ...student, status: targetStatus } : student
      )
    );
  };

  // Run dynamic dataset filtering logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.subId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "All" || student.classBadge === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Get active month charts collection array base
  const activeChartDataset = classAnalyticsData[selectedClass] || classAnalyticsData["All"];

  return (
    <div className="flex-1 bg-[#F8FAFC] p-6 md:p-8 min-h-screen font-sans antialiased text-slate-800 relative">
      
      {/* HEADER PAGE LABELS */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#1B2559]">Attendance</h1>
      </div>

      {/* --- MONTHLY ANALYTICS TRUE VISUALIZATION COMPONENT --- */}
      <div className="bg-white rounded-3xl p-6 mb-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 rounded-xl text-[#4E36E2]">
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#1B2559]">Monthly Analytics</h3>
              <p className="text-xs text-gray-400 font-bold mt-0.5 uppercase tracking-wide">
                Active View Profile: <span className="text-[#4E36E2]">{selectedClass}</span>
              </p>
            </div>
          </div>

          {/* Color Mapping Indexes Indicators */}
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#05CD99]"></span>
              <span className="text-gray-500">Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FFB547]"></span>
              <span className="text-gray-500">Late</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#EE5D50]"></span>
              <span className="text-gray-500">Absent</span>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Column Cluster Bar Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-end pt-4 border-b border-gray-100 pb-2">
          {activeChartDataset.map((data) => (
            <div key={data.month} className="flex flex-col items-center group">
              
              {/* Grouped Cluster Column Container */}
              <div className="flex items-end gap-1.5 h-36 w-full justify-center px-2 relative">
                
                {/* Present Bar Pillar */}
                <div 
                  style={{ height: `${data.present}%` }} 
                  className="w-3.5 bg-[#05CD99] rounded-t-sm transition-all duration-500 relative"
                  title={`Present: ${data.present}%`}
                />
                
                {/* Late Bar Pillar */}
                <div 
                  style={{ height: `${data.late * 4}%` }} // Multiplying for enhanced visibility weight 
                  className="w-3.5 bg-[#FFB547] rounded-t-sm transition-all duration-500 relative"
                  title={`Late: ${data.late}%`}
                />
                
                {/* Absent Bar Pillar */}
                <div 
                  style={{ height: `${data.absent * 4}%` }} // Scale multiplier 
                  className="w-3.5 bg-[#EE5D50] rounded-t-sm transition-all duration-500 relative"
                  title={`Absent: ${data.absent}%`}
                />

              </div>

              {/* Label Month String */}
              <span className="text-xs font-black text-gray-400 uppercase tracking-wider mt-3 block group-hover:text-slate-700 transition-colors">
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- UPPER FILTERS CONTROLLERS BAR --- */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        
        {/* Real-time search string parser input field */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 w-full sm:max-w-xs">
          <Search size={16} className="text-gray-400 mr-2.5 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm font-medium w-full text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Secondary filters grouping cluster */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          
          {/* Calendar Picker Indicator element */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-white text-xs font-bold text-gray-600 shadow-xs">
            <Calendar size={14} className="text-gray-400" />
            <span>June 5, 2026</span>
          </div>

          {/* Core Classes drop selector field */}
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold text-gray-700 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-xs min-w-[140px]"
            >
              <option value="All">All Classes</option>
              <option value="Class 10-A">Class 10-A</option>
              <option value="Class 10-B">Class 10-B</option>
              <option value="Class 10-C">Class 10-C</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* --- ROSTER SELECTION MATRIX CARD --- */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden mb-24">
        
        {/* COMPACT INNER CONTEXTUAL HEADER ACTIONS & SAVE BUTTON EMBEDDED */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-bold">
            <button onClick={() => markAllAs("Present")} className="text-indigo-600 hover:underline bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-2xs">Mark All Present</button>
            <button onClick={() => markAllAs("Absent")} className="text-gray-500 hover:underline bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-2xs">All Absent</button>
          </div>

          {/* PRIMARY INTEGRATED ACTION FORM EMISSION ACTION ACTION CONTROLLER */}
          <button
            onClick={() => alert("Attendance logs compiled and updated successfully.")}
            className="w-full sm:w-auto bg-[#4E36E2] hover:bg-[#3b25ca] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Save size={14} />
            <span>Save Attendance</span>
          </button>
        </div>

        {/* Roster Layout Scroll Pipeline view */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider bg-gray-50/10">
                <th className="py-4 px-6">Student Info</th>
                <th className="py-4 px-6">Class Section</th>
                <th className="py-4 px-6 min-w-[320px]">Roster Tracking Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold text-sm text-[#1B2559]">
              {filteredStudents.map((student) => (
                <tr 
                  key={student.id} 
                  className={`transition-colors ${
                    student.status === "Present" ? "bg-emerald-50/5" : 
                    student.status === "Absent" ? "bg-rose-50/5" : "bg-amber-50/5"
                  }`}
                >
                  
                  {/* Avatar & Identifiers block */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="w-10 h-10 rounded-full object-cover shadow-2xs border border-gray-100"
                      />
                      <div>
                        <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{student.name}</h4>
                        <span className="text-xs font-semibold text-gray-400 block mt-0.5">{student.subId}</span>
                      </div>
                    </div>
                  </td>

                  {/* Class Identity Badge */}
                  <td className="py-4 px-6">
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">
                      {student.classBadge}
                    </span>
                  </td>

                  {/* Status pills radios collection mapping blocks */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      
                      {/* Control Option: Present */}
                      <label className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border cursor-pointer select-none text-xs transition-all ${
                        student.status === "Present" ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-2xs" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}>
                        <input type="radio" name={`status-${student.id}`} checked={student.status === "Present"} onChange={() => handleStatusChange(student.id, "Present")} className="sr-only" />
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${student.status === "Present" ? "border-emerald-500" : "border-gray-300"}`}>
                          {student.status === "Present" && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        </div>
                        <span>Present</span>
                      </label>

                      {/* Control Option: Absent */}
                      <label className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border cursor-pointer select-none text-xs transition-all ${
                        student.status === "Absent" ? "bg-rose-50 border-rose-300 text-rose-700 shadow-2xs" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}>
                        <input type="radio" name={`status-${student.id}`} checked={student.status === "Absent"} onChange={() => handleStatusChange(student.id, "Absent")} className="sr-only" />
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${student.status === "Absent" ? "border-rose-500" : "border-gray-300"}`}>
                          {student.status === "Absent" && <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                        </div>
                        <span>Absent</span>
                      </label>

                      {/* Control Option: Late */}
                      <label className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border cursor-pointer select-none text-xs transition-all ${
                        student.status === "Late" ? "bg-amber-50 border-amber-300 text-amber-700 shadow-2xs" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}>
                        <input type="radio" name={`status-${student.id}`} checked={student.status === "Late"} onChange={() => handleStatusChange(student.id, "Late")} className="sr-only" />
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${student.status === "Late" ? "border-amber-500" : "border-gray-300"}`}>
                          {student.status === "Late" && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                        </div>
                        <span>Late</span>
                      </label>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- AI ASSISTANT OVERLAY ACTION FLOATING ACTION CAPTURE LINK --- */}
      <button
        onClick={() => setIsAiOpen(true)}
        className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-40 bg-[#4E36E2] hover:bg-[#3b25ca] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-base transition-all transform hover:scale-105"
      >
        <Sparkles size={16} fill="currentColor" />
        <span>AI Assistant</span>
      </button>

      {/* =========================================================================
         --- SLIDEOVER DRAWER CAPTURE PORTAL: COHORT INSIGHTS HUD ASSISTANT ---
         ========================================================================= */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FFFDF9] w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-amber-100 flex flex-col max-h-[85vh]">
            
            {/* BRAND HEADER BAR REGION */}
            <div className="bg-[#4E36E2] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-md font-black tracking-tight">AI Assistant</h3>
                </div>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* INTERACTIVE NAVIGATION CONTROL CHIPS TABS */}
            <div className="flex items-center border-b border-gray-100 bg-white px-4">
              <button onClick={() => setActiveAiTab("insights")} className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${activeAiTab === "insights" ? "border-b-[#4E36E2] text-[#4E36E2]" : "border-b-transparent text-gray-400"}`}>
                <TrendingUp size={14} />
                <span>Insights</span>
              </button>
              <button onClick={() => setActiveAiTab("suggestions")} className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${activeAiTab === "suggestions" ? "border-b-[#4E36E2] text-[#4E36E2]" : "border-b-transparent text-gray-400"}`}>
                <Lightbulb size={14} />
                <span>Suggestions</span>
              </button>
              <button onClick={() => setActiveAiTab("alerts")} className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${activeAiTab === "alerts" ? "border-b-[#4E36E2] text-[#4E36E2]" : "border-b-transparent text-gray-400"}`}>
                <AlertTriangle size={14} />
                <span>Alerts</span>
              </button>
            </div>

            {/* CONTEXT WINDOW VIEWS CONTAINER PANELS */}
            <div className="p-5 overflow-y-auto space-y-3.5 bg-gray-50/50 flex-1">
              
              {activeAiTab === "insights" && (
                <>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3 items-start">
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-bold text-emerald-950 leading-snug">Overall section presence rate has improved by 4.2% relative to the prior validation window.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3 items-start">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-bold text-amber-950 leading-snug">Friday rosters show a recurrent 8% higher trend in late arrivals than midweek classes.</p>
                  </div>
                </>
              )}

              {activeAiTab === "suggestions" && (
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex gap-3 items-start">
                  <Lightbulb size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-bold text-indigo-950 leading-snug">Consider adjusting standard morning introductory tasks to mitigate recurring late impacts.</p>
                </div>
              )}

              {activeAiTab === "alerts" && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex gap-4 items-center">
                  <span className="text-xs font-black uppercase text-rose-500 bg-white px-2 py-1 rounded shadow-2xs tracking-wider shrink-0">Critical</span>
                  <p className="text-sm font-bold text-rose-950 leading-snug">Marcus Johnson has missed 3 consecutive classes this block without excuse documentation.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}