import React, { useState } from "react";
import { ChevronDown, Sparkles, X, Bot, TrendingUp, Lightbulb, AlertTriangle, CheckCircle, BookOpen, Send, ShieldCheck } from "lucide-react";

export default function ExamMarks() {
  // --- APPLICATION STATE CONTROLLERS ---
  const [selectedUnit, setSelectedUnit] = useState("Unit 3");
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState("insights");

  // --- CORE ROSTER DATABASE DATA (Screenshot 2026-06-05 155527.png & 155547.png) ---
  const [students, setStudents] = useState([
    { id: "STU-2023-010", name: "Emma Watson", subId: "STU-2023-001", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", math: 92, advAlgebra: 88, statistics: 95 },
    { id: "STU-2023-118", name: "Sophia Chen", subId: "STU-2023-118", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", math: 78, advAlgebra: 82, statistics: 95 },
    { id: "STU-2023-055", name: "Lucas Garcia", subId: "STU-2023-055", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", math: 65, advAlgebra: 70, statistics: 68 },
    { id: "STU-2023-089", name: "Olivia Smith", subId: "STU-2023-089", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", math: 89, advAlgebra: 91, statistics: 86 },
    { id: "STU-2023-227", name: "Aarohi Patel", subId: "STU-2023-227", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", math: 82, advAlgebra: 79, statistics: 84 },
    { id: "STU-2023-201", name: "Ethan Nguyen", subId: "STU-2023-201", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150", math: 74, advAlgebra: 76, statistics: 72 }
  ]);

  // --- SCORE INPUT UPDATE HANDLER ---
  const handleScoreChange = (studentId, subjectField, targetValue) => {
    // Sanitize values between clean raw scores constraint limits [0 - 100]
    let parsedScore = parseInt(targetValue, 10) || 0;
    if (parsedScore > 100) parsedScore = 100;
    if (parsedScore < 0) parsedScore = 0;

    setStudents(prev =>
      prev.map(item => (item.id === studentId ? { ...item, [subjectField]: parsedScore } : item))
    );
  };

  // --- DYNAMIC RUNTIME EVALUATORS MATRIX METRICS ---
  const calculateTotalAndGrade = (s) => {
    const combinedTotal = s.math + s.advAlgebra + s.statistics;
    let computedLetter = "F";
    
    if (combinedTotal >= 270) computedLetter = "Grade A+";
    else if (combinedTotal >= 255) computedLetter = "Grade A-";
    else if (combinedTotal >= 240) computedLetter = "Grade B+";
    else if (combinedTotal >= 225) computedLetter = "Grade B";
    else if (combinedTotal >= 200) computedLetter = "Grade C";
    else computedLetter = "Grade D";

    return { total: combinedTotal, letter: computedLetter };
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] p-6 md:p-8 min-h-screen font-sans antialiased text-slate-800 relative">
      
      {/* --- MAIN PAGE TITLE & ACTION BANNER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1B2559]">Exam Marks</h1>
          <p className="text-sm text-gray-400 font-bold mt-0.5">Enter marks and track student performance</p>
        </div>
        
        {/* Publish Marks Primary Action Button */}
        <button 
          onClick={() => alert("Exam records have been successfully locked and published to the parent-student dashboard channels.")}
          className="bg-[#4E36E2] hover:bg-[#3b25ca] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Send size={15} />
          <span>Publish Marks</span>
        </button>
      </div>

      {/* --- EXAM PERFORMANCE INSIGHTS TOP ROW (Screenshot 2026-06-05 155512.png) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        
        {/* Average Metric Card */}
        <div className="bg-white p-5 rounded-2xl border-l-4 border-l-[#4E36E2] border border-gray-100 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#4E36E2] mb-3">
            <BookOpen size={16} />
          </div>
          <span className="text-2xl font-black text-[#1B2559]">238/300</span>
          <span className="text-xs font-bold text-gray-400 block mt-1 uppercase tracking-wider">Average Score</span>
          <span className="text-[11px] font-semibold text-gray-400 block mt-0.5">Across all subjects</span>
        </div>

        {/* Top Outlier Highest Card */}
        <div className="bg-white p-5 rounded-2xl border-l-4 border-l-purple-500 border border-gray-100 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-3">
            <ShieldCheck size={16} />
          </div>
          <span className="text-2xl font-black text-[#1B2559]">285/300</span>
          <span className="text-xs font-bold text-purple-500 block mt-1 uppercase tracking-wider">Highest Score</span>
          <span className="text-[11px] font-semibold text-gray-400 block mt-0.5">Top performer cell</span>
        </div>

        {/* Section Percent Pass Threshold Card */}
        <div className="bg-white p-5 rounded-2xl border-l-4 border-l-emerald-500 border border-gray-100 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3">
            <CheckCircle size={16} />
          </div>
          <span className="text-2xl font-black text-[#1B2559]">88%</span>
          <span className="text-xs font-bold text-emerald-500 block mt-1 uppercase tracking-wider">Pass Rate</span>
          <span className="text-[11px] font-semibold text-gray-400 block mt-0.5">≥60% baseline threshold</span>
        </div>

      </div>

      {/* --- EXAM TERM SELECTOR FILTERS TABS BAR (Screenshot 2026-06-05 155512.png) --- */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button 
          onClick={() => setSelectedUnit("Unit 1")}
          className={`px-5 py-3 rounded-full text-xs font-bold border transition-all ${
            selectedUnit === "Unit 1" ? "bg-[#4E36E2] text-white border-[#4E36E2]" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Unit 1 - Algebra basics <span className="opacity-60 ml-1">Feb 2026</span>
        </button>
        <button 
          onClick={() => setSelectedUnit("Unit 2")}
          className={`px-5 py-3 rounded-full text-xs font-bold border transition-all ${
            selectedUnit === "Unit 2" ? "bg-[#4E36E2] text-white border-[#4E36E2]" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Unit 2 - Linear Equations <span className="opacity-60 ml-1">Mar 2026</span>
        </button>
        <button 
          onClick={() => setSelectedUnit("Unit 3")}
          className={`px-5 py-3 rounded-full text-xs font-bold border transition-all ${
            selectedUnit === "Unit 3" ? "bg-[#4E36E2] text-white border-[#4E36E2]" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Unit 3 - Quadratic Equations <span className="opacity-60 ml-1">Apr 2026</span>
        </button>
      </div>

      {/* --- MARKS ENTRY SCORE MATRIX GRID COMPONENT CONTAINER --- */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden mb-24">
        
        {/* Sub-Header Context Row Info */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-[#1B2559]">Marks Entry Class 10A</h3>
            <p className="text-xs text-gray-400 font-bold mt-0.5">Enter Score for Each subject out of 100</p>
          </div>

          {/* Quick-Filter Class Options Badge */}
          <div className="relative self-end sm:self-auto">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-black text-gray-700 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs min-w-[120px]"
            >
              <option value="10-A">Class 10-A</option>
              <option value="10-B">Class 10-B</option>
              <option value="10-C">Class 10-C</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Interactive Matrix Roster Layout Sheet */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider bg-gray-50/10">
                <th className="py-4 px-6 min-w-[200px]">Student</th>
                <th className="py-4 px-6 text-center">Mathematics</th>
                <th className="py-4 px-6 text-center">Adv Algebra</th>
                <th className="py-4 px-6 text-center">Statistics</th>
                <th className="py-4 px-6 min-w-[240px]">Performance Metric Breakdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-bold text-sm text-[#1B2559]">
              {students.map((student) => {
                const { total, letter } = calculateTotalAndGrade(student);
                const progressPercent = (total / 300) * 100;
                
                // Alert criteria color assignment if score parameters dip low (Matches Lucas entry profile)
                const isWarningState = total < 210;

                return (
                  <tr key={student.id} className="hover:bg-slate-50/40 transition-colors">
                    
                    {/* Identity profile cell card component */}
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

                    {/* Mathematics Column Input Cell */}
                    <td className="py-4 px-6 text-center">
                      <input 
                        type="number"
                        value={student.math}
                        onChange={(e) => handleScoreChange(student.id, "math", e.target.value)}
                        className="w-16 bg-indigo-50/50 border border-indigo-100 focus:bg-white focus:border-indigo-500 rounded-xl px-2 py-2 text-center text-sm font-black text-indigo-700 focus:outline-none transition-all"
                      />
                    </td>

                    {/* Adv Algebra Column Input Cell */}
                    <td className="py-4 px-6 text-center">
                      <input 
                        type="number"
                        value={student.advAlgebra}
                        onChange={(e) => handleScoreChange(student.id, "advAlgebra", e.target.value)}
                        className="w-16 bg-indigo-50/50 border border-indigo-100 focus:bg-white focus:border-indigo-500 rounded-xl px-2 py-2 text-center text-sm font-black text-indigo-700 focus:outline-none transition-all"
                      />
                    </td>

                    {/* Statistics Column Input Cell */}
                    <td className="py-4 px-6 text-center">
                      <input 
                        type="number"
                        value={student.statistics}
                        onChange={(e) => handleScoreChange(student.id, "statistics", e.target.value)}
                        className="w-16 bg-indigo-50/50 border border-indigo-100 focus:bg-white focus:border-indigo-500 rounded-xl px-2 py-2 text-center text-sm font-black text-indigo-700 focus:outline-none transition-all"
                      />
                    </td>

                    {/* Performance Progress Metrics Column Tracker */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1.5 justify-center">
                        <div className="flex items-center justify-between text-xs font-black">
                          <span className={`${isWarningState ? "text-rose-600" : "text-gray-900"}`}>{letter}</span>
                          <span className="text-gray-400">{total}/300</span>
                        </div>
                        {/* Dynamic Progress Bar Bar */}
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${progressPercent}%` }}
                            className={`h-full rounded-full transition-all duration-500 ${
                              isWarningState ? "bg-rose-500" : "bg-[#4E36E2]"
                            }`}
                          />
                        </div>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- AI FLOATING SYSTEM DRAWER TRIGGER CONTROLLER --- */}
      <button
        onClick={() => setIsAiOpen(true)}
        className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-40 bg-[#4E36E2] hover:bg-[#3b25ca] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-bold text-base transition-all transform hover:scale-105 active:scale-95"
      >
        <Sparkles size={16} fill="currentColor" />
        <span>AI Assistant</span>
      </button>

      {/* =========================================================================
         --- OVERLAY PANEL FLYOUT DRAWER: INTERACTIVE COHORT INTEL HUD ---
         ========================================================================= */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-amber-100 flex flex-col max-h-[85vh]">
            
            {/* Header Module Title Block */}
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

            {/* Sub-navigation controls tabs */}
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

            {/* Context Canvas Panels Viewports */}
            <div className="p-5 overflow-y-auto space-y-3.5 bg-gray-50/50 flex-1">
              
              {activeAiTab === "insights" && (
                <>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3 items-start">
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-bold text-emerald-950 leading-snug">Class average on Unit 3 scores shows a performance expansion of +12% versus the baseline model of Unit 2.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3 items-start">
                    <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-bold text-amber-950 leading-snug">Advanced Algebra section marks display a higher internal statistical variance deviation range this term.</p>
                  </div>
                </>
              )}

              {activeAiTab === "suggestions" && (
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex gap-3 items-start">
                  <Lightbulb size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-bold text-indigo-950 leading-snug">Targeted focus group study tasks for Lucas Garcia on Statistics variables could elevate pass probability indexes efficiently.</p>
                </div>
              )}

              {activeAiTab === "alerts" && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex gap-4 items-center">
                  <span className="text-xs font-black uppercase text-rose-500 bg-white px-2 py-1 rounded shadow-2xs tracking-wider shrink-0">Warning</span>
                  <p className="text-sm font-bold text-rose-950 leading-snug">Lucas Garcia requires an explicit parent performance sync report as total aggregate outputs fell underneath 70% bounds.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}