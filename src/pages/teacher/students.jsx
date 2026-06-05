import React, { useState } from "react";
import { Search, ChevronDown, Sparkles, X, Bot, TrendingUp, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

export default function Students() {
  // UI & Filter state engines
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState("insights");

  // --- RAW FIGMA DATA FROM SCREENSHOT 2026-06-05 150813_2.png DOWN TO 150857_2.png ---
  const studentsData = [
    { id: "STU-2023-010", name: "Emma Watson", subId: "STU-2023-001", classBadge: "10-A", attendancePct: 98, attendanceTxt: "Excellent", statusColor: "excellent", gradeStr: "Grade A+", rawScore: 92, barColor: "bg-indigo-600", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { id: "STU-2023-042", name: "Marcus Johnson", subId: "STU-2023-042", classBadge: "10-B", attendancePct: 82, attendanceTxt: "Need Attention", statusColor: "attention", gradeStr: "Grade B", rawScore: 76, barColor: "bg-amber-700", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
    { id: "STU-2023-118", name: "Sophia Chen", subId: "STU-2023-118", classBadge: "10-A", attendancePct: 100, attendanceTxt: "Excellent", statusColor: "excellent", gradeStr: "Grade A", rawScore: 88, barColor: "bg-indigo-600", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
    { id: "STU-2023-055", name: "Lucas Garcia", subId: "STU-2023-055", classBadge: "10-C", attendancePct: 68, attendanceTxt: "At Risk", statusColor: "risk", gradeStr: "Grade C", rawScore: 58, barColor: "bg-rose-600", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { id: "STU-2023-089", name: "Olivia Smith", subId: "STU-2023-089", classBadge: "10-B", attendancePct: 94, attendanceTxt: "Good", statusColor: "good", gradeStr: "Grade A-", rawScore: 84, barColor: "bg-indigo-600", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
    { id: "STU-2023-201", name: "Ethan Nguyen", subId: "STU-2023-201", classBadge: "10-A", attendancePct: 88, attendanceTxt: "Need Attention", statusColor: "attention", gradeStr: "Grade B+", rawScore: 79, barColor: "bg-amber-700", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150" },
    { id: "STU-2023-227", name: "Aarohi Patel", subId: "STU-2023-227", classBadge: "10-A", attendancePct: 96, attendanceTxt: "Excellent", statusColor: "excellent", gradeStr: "Grade A", rawScore: 90, barColor: "bg-indigo-600", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
    { id: "STU-2023-238", name: "Daniel Rivera", subId: "STU-2023-238", classBadge: "10-B", attendancePct: 71, attendanceTxt: "At Risk", statusColor: "risk", gradeStr: "Grade C+", rawScore: 62, barColor: "bg-rose-600", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150" },
    { id: "STU-2023-244", name: "Layla Hassan", subId: "STU-2023-244", classBadge: "10-A", attendancePct: 91, attendanceTxt: "Good", statusColor: "good", gradeStr: "Grade B+", rawScore: 81, barColor: "bg-indigo-600", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150" },
    { id: "STU-2023-251", name: "Noah Tan", subId: "STU-2023-251", classBadge: "10-C", attendancePct: 84, attendanceTxt: "Need Attention", statusColor: "attention", gradeStr: "Grade B", rawScore: 74, barColor: "bg-amber-700", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150" },
    { id: "STU-2023-263", name: "Isabella Turner", subId: "STU-2023-263", classBadge: "10-A", attendancePct: 97, attendanceTxt: "Excellent", statusColor: "excellent", gradeStr: "Grade A+", rawScore: 95, barColor: "bg-indigo-600", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150" },
    { id: "STU-2023-271", name: "Rohan Mehta", subId: "STU-2023-271", classBadge: "10-B", attendancePct: 86, attendanceTxt: "Need Attention", statusColor: "attention", gradeStr: "Grade B+", rawScore: 78, barColor: "bg-amber-700", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150" },
    { id: "STU-2023-284", name: "Camila Torres", subId: "STU-2023-284", classBadge: "10-B", attendancePct: 92, attendanceTxt: "Good", statusColor: "good", gradeStr: "Grade A-", rawScore: 85, barColor: "bg-indigo-600", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" },
    { id: "STU-2023-291", name: "Jamal Brown", subId: "STU-2023-291", classBadge: "10-C", attendancePct: 65, attendanceTxt: "At Risk", statusColor: "risk", gradeStr: "Grade C", rawScore: 55, barColor: "bg-rose-600", avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150" },
    { id: "STU-2023-304", name: "Mia Park", subId: "STU-2023-304", classBadge: "10-D", attendancePct: 95, attendanceTxt: "Excellent", statusColor: "excellent", gradeStr: "Grade A", rawScore: 89, barColor: "bg-indigo-600", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150" },
    { id: "STU-2023-319", name: "Omar Khalid", subId: "STU-2023-319", classBadge: "10-B", attendancePct: 80, attendanceTxt: "Need Attention", statusColor: "attention", gradeStr: "Grade B+", rawScore: 70, barColor: "bg-amber-700", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150" }
  ];

  // Helper mapping to return exact Tailwind text layout design colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "excellent": return "text-[#10B981]";
      case "good": return "text-[#06B6D4]";
      case "attention": return "text-[#B45309]";
      case "risk": return "text-[#EF4444]";
      default: return "text-gray-500";
    }
  };

  // Directory filter processing matrix
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.subId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "All" || student.classBadge === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="flex-1 bg-[#F8FAFC] p-6 md:p-8 min-h-screen font-sans antialiased text-slate-800 relative">
      
      {/* --- PAGE MAIN HEADER TITLE TITLE --- */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#1B2559]">Students</h1>
      </div>

      {/* --- TOOLBAR CONTROLLER SECTION (Screenshot 2026-06-05 150813_2.png) --- */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        
        {/* Rounded Input Lookup box */}
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

        {/* Dropdown Menu Functional Control component */}
        <div className="relative">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm font-bold text-gray-700 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-xs min-w-[140px]"
          >
            <option value="All">All Classes</option>
            <option value="10-A">Class 10-A</option>
            <option value="10-B">Class 10-B</option>
            <option value="10-C">Class 10-C</option>
            <option value="10-D">Class 10-D</option>
          </select>
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>
          </div>
          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* --- CENTRAL STUDENTS MAIN DIRECTORY DATA MATRIX TABLE --- */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden mb-24">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider bg-gray-50/50">
                <th className="py-4 px-6">Student</th>
                <th className="py-4 px-6">Class</th>
                <th className="py-4 px-6">Attendance %</th>
                <th className="py-4 px-6">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold text-sm text-[#1B2559]">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/40 transition-colors">
                  
                  {/* C1: Student Identity Module */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="w-10 h-10 rounded-full object-cover shadow-xs border border-gray-100"
                      />
                      <div>
                        <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{student.name}</h4>
                        <span className="text-xs font-semibold text-gray-400 block mt-0.5">{student.subId}</span>
                      </div>
                    </div>
                  </td>

                  {/* C2: Class Designation Label Badge */}
                  <td className="py-4 px-6">
                    <span className="bg-indigo-50 text-indigo-500 text-xs font-bold px-2.5 py-1 rounded-md">
                      {student.classBadge}
                    </span>
                  </td>

                  {/* C3: Telemetry Attendance Indicators */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4 text-sm">
                      <span className={getStatusStyle(student.statusColor)}>{student.attendancePct}%</span>
                      <span className={`${getStatusStyle(student.statusColor)} font-medium`}>{student.attendanceTxt}</span>
                    </div>
                  </td>

                  {/* C4: Real Score Fractional Progress Module */}
                  <td className="py-4 px-6 min-w-[220px]">
                    <div className="flex flex-col gap-1.5 max-w-[180px]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-900 font-bold">{student.gradeStr}</span>
                        <span className="text-gray-400 font-medium">{student.rawScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full opacity-80 ${student.barColor}`} 
                          style={{ width: `${student.rawScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- AI ASSISTANT SIDE TRIGGER FLOATER FLOATING ACTION COMPONENT --- */}
      <button
        onClick={() => setIsAiOpen(true)}
        className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-40 bg-[#4E36E2] hover:bg-[#3b25ca] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-base transition-all transform hover:scale-105 active:scale-95"
      >
        <Sparkles size={16} fill="currentColor" />
        <span>AI Assistant</span>
      </button>

      {/* =========================================================================
         --- SLIDEOVER OVERLAY COMPONENT MODULE: TABBED TEACHER AI CORE ASSISTANT ---
         ========================================================================= */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-amber-100 flex flex-col max-h-[85vh] animate-fade-in">
            
            {/* BRAND HEADER TOP */}
            <div className="bg-[#4E36E2] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-md font-black tracking-tight">AI Assistant</h3>
                </div>
              </div>
              <button 
                onClick={() => setIsAiOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* TAB SELECTORS (Screenshot 2026-06-05 150829_2.png, 150847_2.png, 150857_2.png) */}
            <div className="flex items-center border-b border-gray-100 bg-white px-4">
              <button
                onClick={() => setActiveAiTab("insights")}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                  activeAiTab === "insights" ? "border-b-[#4E36E2] text-[#4E36E2]" : "border-b-transparent text-gray-400 hover:text-gray-500"
                }`}
              >
                <TrendingUp size={14} />
                <span>Insights</span>
              </button>
              <button
                onClick={() => setActiveAiTab("suggestions")}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                  activeAiTab === "suggestions" ? "border-b-[#4E36E2] text-[#4E36E2]" : "border-b-transparent text-gray-400 hover:text-gray-500"
                }`}
              >
                <Lightbulb size={14} />
                <span>Suggestions</span>
              </button>
              <button
                onClick={() => setActiveAiTab("alerts")}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                  activeAiTab === "alerts" ? "border-b-[#4E36E2] text-[#4E36E2]" : "border-b-transparent text-gray-400 hover:text-gray-500"
                }`}
              >
                <AlertTriangle size={14} />
                <span>Alerts</span>
              </button>
            </div>

            {/* INTERACTIVE COMPONENT CONTENT SLIDER SPACE */}
            <div className="p-5 overflow-y-auto space-y-3.5 bg-gray-50/50 flex-1">
              
              {/* INSIGHTS VIEW SUBMODAL BLOCK (Screenshot 2026-06-05 150829_2.png) */}
              {activeAiTab === "insights" && (
                <>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-emerald-500 shrink-0 shadow-2xs">
                      <CheckCircle size={14} />
                    </div>
                    <p className="text-sm font-bold text-emerald-950 leading-snug">
                      Emma Watson's test consistency is up by 15% across algebra modules this cycle.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-amber-600 shrink-0 shadow-2xs">
                      <AlertTriangle size={14} />
                    </div>
                    <p className="text-sm font-bold text-amber-950 leading-snug">
                      Marcus Johnson shows a down-trending score vector corresponding directly with lowering attendance.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-emerald-500 shrink-0 shadow-2xs">
                      <CheckCircle size={14} />
                    </div>
                    <p className="text-sm font-bold text-emerald-950 leading-snug">
                      Sophia Chen maintains premium standing positions across standard benchmark configurations.
                    </p>
                  </div>
                </>
              )}

              {/* SUGGESTIONS VIEW SUBMODAL BLOCK (Screenshot 2026-06-05 150847_2.png) */}
              {activeAiTab === "suggestions" && (
                <>
                  <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-indigo-500 shrink-0 shadow-2xs">
                      <Lightbulb size={14} />
                    </div>
                    <p className="text-sm font-bold text-indigo-950 leading-snug">
                      Provide Emma Watson with extension/honor level matrix coursework to keep engagement optimal.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-indigo-500 shrink-0 shadow-2xs">
                      <Lightbulb size={14} />
                    </div>
                    <p className="text-sm font-bold text-indigo-950 leading-snug">
                      Set up mandatory foundational conceptual reviews for Lucas Garcia before upcoming final assessments.
                    </p>
                  </div>
                </>
              )}

              {/* ALERTS VIEW SUBMODAL BLOCK (Screenshot 2026-06-05 150857_2.png) */}
              {activeAiTab === "alerts" && (
                <>
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex gap-4 items-center">
                    <span className="text-xs font-black uppercase text-rose-500 bg-white px-2 py-1 rounded shadow-2xs shrink-0 tracking-wider">Critical</span>
                    <p className="text-sm font-bold text-rose-950 leading-snug">
                      Lucas Garcia attendance drop has triggered standard district compliance warning flags.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-4 items-center">
                    <span className="text-xs font-black uppercase text-amber-600 bg-white px-2 py-1 rounded shadow-2xs shrink-0 tracking-wider">Attention</span>
                    <p className="text-sm font-bold text-amber-950 leading-snug">
                      Marcus Johnson missed submission thresholds for Assignment #5 yesterday.
                    </p>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}